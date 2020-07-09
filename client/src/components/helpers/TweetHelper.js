import { useEffect, useContext, useLayoutEffect, useState } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const TweetHelper = () => {
	const { tweets, setTweets, tweetsCount, setTweetsCount, setTweetsToUnverifiedCount } = useContext(TweetContext);
	const { setIsTweetsLoading } = useContext(LoadingContext);

	/* Used to make sure it is updated without infinitely running this function. */
	const [effectCount, setEffectCount] = useState(0);

	let tempVerifiedDay = Array(7).fill(0);
	let tempUnverifiedDay = Array(7).fill(0);
	let tempVerifiedHour = Array(24).fill(0);
	let tempUnverifiedHour = Array(24).fill(0);

	useLayoutEffect(() => {
		/* Should this be tweetsWithMention.length? */
		setTweetsCount(tweets.length);

		setEffectCount(effectCount + 1);
		/* Extract a list of just userIds to be queried */
		const userIds = tweets
			.map((tweet) => {
				return tweet.entities.user_mentions.map((um) => um.id);
			})
			.flat(1);

		const sendUsersRequest = async () => {
			if (userIds.length > 0) {
				let unverifiedUserMentions = [];

				/* Only returns userId and verified status. */
				const response = await Axios.post(`/api/twitter/users/`, {
					user_ids: userIds,
				});
				const users = response.data;

				/* TODO (04/14/2020 16:31) There has got to be a better way. */
				/* Map the results to the existing tweets array and add the verified flag to all user mentions */
				for (let i = 0; i < tweets.length; i++) {
					const tweet = tweets[i];

					for (let j = 0; j < tweet.entities.user_mentions.length; j++) {
						const userMentions = tweet.entities.user_mentions[j];

						for (let k = 0; k < users.length; k++) {
							const user = users[k];
							/* If the user was mentioned */
							if (userMentions.id === user.id) {
								if (user.verified) {
									userMentions.userType = 'verified';
									userMentions.verified = true;
									tweet.userType = 'verified';
								} else {
									userMentions.userType = 'unverified';
									userMentions.verified = false;
									tweet.userType = unverifiedUserMentions['user-' + user.id] = 'unverified';
								}
							}
						}
					}
				}

				tweets.map((tweet) => {
					let tempMoment = moment(new Date(tweet.created_at));

					tweet.entities.user_mentions.map((userMention) => {
						if (userMention.verified) {
							tempVerifiedDay[tempMoment.weekday()]++;
							tempVerifiedHour[tempMoment.hour()]++;
						} else {
							userMention.userType = 'unverified';
							userMention.verified = false;
							tempUnverifiedDay[tempMoment.weekday()]++;
							tempUnverifiedHour[tempMoment.hour()]++;
						}
						return userMention;
					});

					return tweet;
				});

				setTweetsToUnverifiedCount(Object.keys(unverifiedUserMentions).length);
				
				if (tweets.length > 0) {
					/* Add a small delay for effect. */
					setIsTweetsLoading(false);
				}
			}
		};

		sendUsersRequest();
	}, [tweets]);

	return null;
};

export default TweetHelper;
