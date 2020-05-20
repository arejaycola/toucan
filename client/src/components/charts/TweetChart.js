import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import D3Chart from './D3Chart';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';

const TweetChart = ({ addToGlobalCount }) => {
	const { tweets, setTweetsCount, setTweetsToUnverifiedCount } = useContext(TweetContext);
	const { isTweetsLoading, setIsTweetsLoading } = useContext(LoadingContext);

	const [verifiedDay, setVerifiedDay] = useState(Array(7).fill(0));
	const [unverifiedDay, setUnverifiedDay] = useState(Array(7).fill(0));
	const [verifiedHour, setVerifiedHour] = useState(Array(24).fill(0));
	const [unverifiedHour, setUnverifiedHour] = useState(Array(24).fill(0));

	let tempVerifiedDay = Array(7).fill(0);
	let tempUnverifiedDay = Array(7).fill(0);
	let tempVerifiedHour = Array(24).fill(0);
	let tempUnverifiedHour = Array(24).fill(0);
	let unverifiedMentionCount = 0;
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

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d == 12) {
			return '12 pm';
		} else if (d == 0) {
			return '12am';
		}

		return moment().hour(d).format('hh');
	};

	return (
		<Row className="mt-3 text-center justify-content-center">
			<Col>
				<Row>
					<Col>
						<h4>Tweets</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6>By Day</h6>
						{isTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={10000} />
						) : (
							<D3Chart
								id="d3-tweet-chart-day"
								label="# of Tweets"
								tickFormat={dayTickFormat}
								dataVerified={verifiedDay}
								dataUnverified={unverifiedDay}
							/>
						)}
					</Col>
					<Col>
						<h6>By Hour</h6>
						{isTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={10000} />
						) : (
							<D3Chart
								id="d3-tweet-chart-hour"
								label="# of Tweets"
								tickFormat={hourTickFormat}
								dataVerified={verifiedHour}
								dataUnverified={unverifiedHour}
							/>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TweetChart;
