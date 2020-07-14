import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import ContainerDimensions from 'react-container-dimensions';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { UserTypeContext } from '../../contexts/UserTypeContext';
import { StatusContext } from '../../contexts/StatusContext';
import D3Chart from '../helpers/D3Chart';
import ModalXLarge from '../ModalXLarge';
import Filters from './Filters';

import useUserTypeToggleHelper from '../../hooks/useUserTypeToggleHelper';
import useToggleUserType from '../../hooks/useToggleUserType';
import useToggleStatus from '../../hooks/useToggleStatus';

const TimeToday = ({ viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);
	const { showBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeContext);
	const { showAllStatuses, showRetweets, showQuotedTweets, showTweets } = useContext(StatusContext);

	const [bestHours, setBestHours] = useState([]);
	const [showChart, setShowChart] = useState(false);

	const [statusesToday, setStatusesToday] = useState(Array(24).fill(0));
	const [retweetsToday, setRetweetsToday] = useState(Array(24).fill(0));
	const [quotedTweetsToday, setQuotedTweetsToday] = useState(Array(24).fill(0));
	const [tweetsToday, setTweetsToday] = useState(Array(24).fill(0));

	const { toggleUserType } = useToggleUserType();
	const { toggleStatus } = useToggleStatus();

	useUserTypeToggleHelper();

	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
			return '12am';
		}

		return moment().hour(d).format('h');
	};

	const onToggleViewClick = () => {
		setShowChart(!showChart);
	};

	useEffect(() => {
		if (statuses.length > 0) {
			let tempForStats = Array(24).fill(0);
			let tempForGraphing = Array(24).fill(0);

			/* Only return statuses from today*/
			statuses
				.filter((status) => {
					return moment(status.created_at).weekday() === moment().weekday();
				})
				.map((status) => {
					tempForStats[moment(status.created_at).hour()]++;
					return status;
				});

			statuses
				.filter((status) => {
					return (showVerifiedUsers && status.userType === 'verified') || (showUnverifiedUsers && status.userType === 'unverified');
				})
				.filter((status) => {
					return moment(status.created_at).weekday() === moment().weekday();
				})
				.map((status) => {
					tempForGraphing[moment(status.created_at).hour()]++;
					return status;
				});

			const maxHour = Math.max(...tempForStats);

			/* Find all occurances of max. */
			const tempBestHours = tempForStats.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);

			setStatusesToday(tempForGraphing);
		}
	}, [statuses, isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let temp = Array(24).fill(0);

		retweets
			.filter((retweet) => {
				return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
			})
			.filter((retweet) => {
				return moment(retweet.created_at).weekday() === moment().weekday();
			})
			.map((retweet) => {
				temp[moment(retweet.created_at).hour()]++;
				return retweet;
			});

		setRetweetsToday(temp);
	}, [retweets, isRetweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let temp = Array(24).fill(0);
		quotedTweets
			.filter((quotedTweet) => {
				return (showVerifiedUsers && quotedTweet.userType === 'verified') || (showUnverifiedUsers && quotedTweet.userType === 'unverified');
			})
			.filter((quotedTweet) => {
				return moment(quotedTweet.created_at).weekday() === moment().weekday();
			})
			.map((quotedTweet) => {
				temp[moment(quotedTweet.created_at).hour()]++;
				return quotedTweet;
			});

		setQuotedTweetsToday(temp);
	}, [quotedTweets, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let temp = Array(24).fill(0);
		tweets
			.filter((tweet) => {
				return (showVerifiedUsers && tweet.userType === 'verified') || (showUnverifiedUsers && tweet.userType === 'unverified');
			})
			.filter((tweet) => {
				return moment(tweet.created_at).weekday() === moment().weekday();
			})
			.map((tweet) => {
				temp[moment(tweet.created_at).hour()]++;
				return tweet;
			});

		// console.log(temp);
		setTweetsToday(temp);
	}, [tweets, isTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
						) : (
							<>
								<strong>
									{bestHours.map((hour, i) => {
										return i !== bestHours.length - 1 ? <span key={i}>{hour}, </span> : <span key={i}>{hour}</span>;
									})}
								</strong>
							</>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best hour(s) to tweet today</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<Button id="time-today" onClick={() => setShowChart(!showChart)} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						<ModalXLarge title={'Best Time Today Details'} showChart={showChart} onHide={() => setShowChart(false)}>
							<ContainerDimensions>
								{({ width, height }) => (
									<>
										<Row>
											<Col className="p-0 mx-0 text-center">
												<h6>Best Hour Today</h6>
												<D3Chart
													id="d3-time-today-chart"
													label="# of Statuses w/ User Mention"
													tickFormat={hourTickFormat}
													width={width}
													height={width * 0.5}
													data={[
														{ show: showAllStatuses, type: 'all', datum: statusesToday },
														{ show: showRetweets, type: 'retweets', datum: retweetsToday },
														{ show: showTweets, type: 'tweets', datum: tweetsToday },
														{ show: showQuotedTweets, type: 'quoted', datum: quotedTweetsToday },
													]}
												/>
											</Col>
										</Row>
										<Filters
											showAllStatuses={showAllStatuses}
											showRetweets={showRetweets}
											showTweets={showTweets}
											showQuotedTweets={showQuotedTweets}
											toggleStatus={toggleStatus}
											showBothUserTypes={showBothUserTypes}
											showVerifiedUsers={showVerifiedUsers}
											showUnverifiedUsers={showUnverifiedUsers}
											toggleUserType={toggleUserType}
										/>
									</>
								)}
							</ContainerDimensions>
						</ModalXLarge>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
