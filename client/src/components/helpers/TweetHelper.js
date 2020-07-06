import { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const TweetHelper = ({ addToGlobalCount }) => {
	const {
		tweets,
		setTweetsCount,
		setTweetsToUnverifiedCount,
		setVerifiedTweetsTime,
		setUnverifiedTweetsTime,
		setVerifiedTweetsDay,
		setUnverifiedTweetsDay,
	} = useContext(TweetContext);
	const { isTweetsLoading, setIsTweetsLoading } = useContext(LoadingContext);

	const [verifiedDay, setVerifiedDay] = useState(Array(7).fill(0));
	const [unverifiedDay, setUnverifiedDay] = useState(Array(7).fill(0));
	const [verifiedHour, setVerifiedHour] = useState(Array(24).fill(0));
	const [unverifiedHour, setUnverifiedHour] = useState(Array(24).fill(0));

	let tempVerifiedDay = Array(7).fill(0);
	let tempUnverifiedDay = Array(7).fill(0);
	let tempVerifiedHour = Array(24).fill(0);
	let tempUnverifiedHour = Array(24).fill(0);

	useEffect(() => {
		/* Only look at tweets with a user mention */
		const filteredTweets = tweets.filter((tweet) => {
			return tweet.entities.user_mentions.length > 0;
		});

		setTweetsCount(tweets.length);

		const userIds = filteredTweets
			.map((tweet) => {
				return tweet.entities.user_mentions.map((um) => um.id);
			})
			.flat(1);

		const sendUsersRequest = async () => {
			if (userIds.length > 0) {
				const response = await Axios.post(`/api/twitter/users/`, {
					user_ids: userIds,
				});

				let users = response.data.map((user) => {
					return {
						id: user.id,
						verified: user.verified,
					};
				});

				let unverifiedUserMentions = [];
				/* TODO (04/14/2020 16:31) There has got to be a better way. */
				/* Map the results to the existing tweets array and add the verified flag to all user mentions */
				for (let i = 0; i < filteredTweets.length; i++) {
					const tweet = filteredTweets[i];

					for (let j = 0; j < tweet.entities.user_mentions.length; j++) {
						const userMentions = tweet.entities.user_mentions[j];

						for (let k = 0; k < users.length; k++) {
							const user = users[k];

							if (userMentions.id === user.id) {
								userMentions.verified = user.verified;
								if (user.verified === false) {
									unverifiedUserMentions['user-' + user.id] = 'unverified';
								}
							}
						}
					}
				}

				filteredTweets.map((filteredTweet) => {
					let tempMoment = moment(new Date(filteredTweet.created_at));
					filteredTweet.entities.user_mentions.map((userMentions) => {
						if (userMentions.verified) {
							tempVerifiedDay[tempMoment.weekday()]++;
							tempVerifiedHour[tempMoment.hour()]++;
						} else {
							tempUnverifiedDay[tempMoment.weekday()]++;
							tempUnverifiedHour[tempMoment.hour()]++;
						}
					});
				});

				setVerifiedTweetsDay(tempVerifiedDay);
				setUnverifiedTweetsDay(tempUnverifiedDay);
				setVerifiedTweetsTime(tempVerifiedHour);
				setUnverifiedTweetsTime(tempUnverifiedHour);

				setTweetsToUnverifiedCount(Object.keys(unverifiedUserMentions).length);
				setVerifiedDay(tempVerifiedDay);
				setUnverifiedDay(tempUnverifiedDay);
				setVerifiedHour(tempVerifiedHour);
				setUnverifiedHour(tempUnverifiedHour);

				setIsTweetsLoading(false);

				addToGlobalCount({
					verifiedDay: tempVerifiedDay,
					unverifiedDay: tempUnverifiedDay,
					verifiedHour: tempVerifiedHour,
					unverifiedHour: tempUnverifiedHour,
				});
			}
		};

		sendUsersRequest();
	}, [tweets]);

	return null;
};

export default TweetHelper;
