import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { TweetContext } from '../contexts/TweetContext';
import D3RetweetChart from './D3RetweetChart';

const TweetChart = () => {
	const { tweets } = useContext(TweetContext);

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

		const userIds = filteredTweets
			.map((tweet) => {
				return tweet.entities.user_mentions.map((um) => um.id);
			})
			.flat(1);

		const sendUsersRequest = async () => {
			if (userIds.length > 0) {
				const response = await Axios.post(`/api/twitter/users/`, {
					user_ids: userIds.toString()
				});

				let users = response.data.map((user) => {
					return {
						id: user.id,
						verified: user.verified
					};
				});

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
							}
						}
					}
				}

				filteredTweets.map((filteredTweet) => {
					// console.log(tweet);
					let tempMoment = moment(new Date(filteredTweet.created_at));
					return filteredTweet.entities.user_mentions.map((userMentions) => {
						if (userMentions.verified) {
							tempVerifiedDay[tempMoment.weekday()]++;
							tempVerifiedHour[tempMoment.hour()]++;
						} else {
							tempUnverifiedDay[tempMoment.weekday()]++;
							tempUnverifiedHour[tempMoment.hour()]++;
						}
					});
				});

				// console.log(tempVerifiedDay);
				// console.log(tempUnverifiedDay);
				setVerifiedDay(tempVerifiedDay);
				setUnverifiedDay(tempUnverifiedDay);
				setVerifiedHour(tempVerifiedHour);
				setUnverifiedHour(tempUnverifiedHour);
			}
		};

		sendUsersRequest();
	}, [tweets]);

	const dayTickFormat = (d) => {
		return moment()
			.weekday(d)
			.format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d == 12) {
			return '12 pm';
		} else if (d == 0) {
			return '12am';
		}

		return moment()
			.hour(d)
			.format('hh');
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<p>Tweet Chart</p>
			<D3RetweetChart id="d3-tweet-chart-day" tickFormat={dayTickFormat} dataVerified={verifiedDay} dataUnverified={unverifiedDay} />
			<D3RetweetChart id="d3-tweet-chart-hour" tickFormat={hourTickFormat} dataVerified={verifiedHour} dataUnverified={unverifiedHour} />
			{/* <D3RetweetChartDay data={props.retweets} /> */}
		</div>
	);
};

export default TweetChart;
