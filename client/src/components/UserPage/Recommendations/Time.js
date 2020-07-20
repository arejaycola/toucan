import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import ContainerDimensions from 'react-container-dimensions';

import { TweetContext } from '../../../contexts/TweetContext';
import { StatusFilterContext } from '../../../contexts/StatusFilterContext';
import { UserTypeFilterContext } from '../../../contexts/UserTypeFilterContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { InitialStatusContext } from '../../../contexts/InitialStatusContext';

import D3Chart from '../../helpers/D3Chart';
import ModalXLarge from '../../ModalXLarge';
import Filters from './Filters';
import useUserTypeToggleHelper from '../../../hooks/useUserTypeToggleHelper';
import useToggleUserType from '../../../hooks/useToggleUserType';
import useToggleStatus from '../../../hooks/useToggleStatus';

const Time = ({ viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);
	const { initialStatuses, initialRetweets, initialQuotedTweets, initialTweets } = useContext(InitialStatusContext);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const [statusesTime, setStatusesTime] = useState(Array(24).fill(0));
	const [retweetsTime, setRetweetsTime] = useState(Array(24).fill(0));
	const [quotedTweetsTime, setQuotedTweetsTime] = useState(Array(24).fill(0));
	const [tweetsTime, setTweetsTime] = useState(Array(24).fill(0));

	const [bestHours, setBestHours] = useState([]);
	const [showChart, setShowChart] = useState(false);

	const { showBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeFilterContext);
	const { showAllStatuses, showRetweets, showQuotedTweets, showTweets } = useContext(StatusFilterContext);

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

	useEffect(() => {
		const tempHoursForStats = Array(24).fill(0);
		const tempHoursForGraphing = Array(24).fill(0);

		/* TODO (07/08/2020 11:16) Figure out how to show all statuses with verified filter */
		initialStatuses.map((status) => {
			tempHoursForStats[moment(status.created_at).hour()]++;
			return status;
		});

		initialStatuses
			.filter((status) => {
				return (showVerifiedUsers && status.userType === 'verified') || (showUnverifiedUsers && status.userType === 'unverified');
			})
			.map((status) => {
				tempHoursForGraphing[moment(status.created_at).hour()]++;
				return status;
			});

		/* Find the maximum in a day */
		const maxHour = Math.max(...tempHoursForStats);

		/* Set the best hours for the label */
		const tempBestHours = tempHoursForStats.reduce((a, e, i) => {
			if (e === maxHour) {
				a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
			}
			return a;
		}, []);

		setBestHours(tempBestHours);
		setStatusesTime(tempHoursForGraphing);
	}, [initialStatuses, isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		const tempHours = Array(24).fill(0);

		initialRetweets
			.filter((retweet) => {
				return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
			})
			.map((retweet) => {
				tempHours[moment(retweet.created_at).hour()]++;
				return retweet;
			});
		setRetweetsTime(tempHours);
	}, [initialRetweets, isRetweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		const tempHours = Array(24).fill(0);
		initialQuotedTweets
			.filter((quotedTweet) => {
				return (showVerifiedUsers && quotedTweet.userType === 'verified') || (showUnverifiedUsers && quotedTweet.userType === 'unverified');
			})
			.map((quotedTweet) => {
				tempHours[moment(quotedTweet.created_at).hour()]++;
				return quotedTweet;
			});
		setQuotedTweetsTime(tempHours);
	}, [initialQuotedTweets, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		const tempHours = Array(24).fill(0);

		initialTweets
			.filter((tweet) => {
				return (showVerifiedUsers && tweet.userType === 'verified') || (showUnverifiedUsers && tweet.userType === 'unverified');
			})
			.map((tweet) => {
				tempHours[moment(tweet.created_at).hour()]++;
				return tweet;
			});

		setTweetsTime(tempHours);
	}, [initialTweets, isTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	// useEffect(() => {
	// 	const tempHoursForStats = Array(24).fill(0);
	// 	const tempHoursForGraphing = Array(24).fill(0);

	// 	/* TODO (07/08/2020 11:16) Figure out how to show all statuses with verified filter */
	// 	statuses.map((status) => {
	// 		tempHoursForStats[moment(status.created_at).hour()]++;
	// 		return status;
	// 	});

	// 	statuses
	// 		.filter((status) => {
	// 			return (showVerifiedUsers && status.userType === 'verified') || (showUnverifiedUsers && status.userType === 'unverified');
	// 		})
	// 		.map((status) => {
	// 			tempHoursForGraphing[moment(status.created_at).hour()]++;
	// 			return status;
	// 		});

	// 	/* Find the maximum in a day */
	// 	const maxHour = Math.max(...tempHoursForStats);

	// 	/* Set the best hours for the label */
	// 	const tempBestHours = tempHoursForStats.reduce((a, e, i) => {
	// 		if (e === maxHour) {
	// 			a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
	// 		}
	// 		return a;
	// 	}, []);

	// 	setBestHours(tempBestHours);
	// 	setStatusesTime(tempHoursForGraphing);
	// }, [statuses, isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	// /* TODO (07/08/2020 11:07) Move these to hooks?*/
	// useEffect(() => {
	// 	const tempHours = Array(24).fill(0);

	// 	retweets
	// 		.filter((retweet) => {
	// 			return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
	// 		})
	// 		.map((retweet) => {
	// 			tempHours[moment(retweet.created_at).hour()]++;
	// 			return retweet;
	// 		});

	// 	setRetweetsTime(tempHours);
	// }, [retweets, isRetweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	// useEffect(() => {
	// 	const tempHours = Array(24).fill(0);

	// 	quotedTweets
	// 		.filter((quotedTweet) => {
	// 			return (showVerifiedUsers && quotedTweet.userType === 'verified') || (showUnverifiedUsers && quotedTweet.userType === 'unverified');
	// 		})
	// 		.map((quotedTweet) => {
	// 			tempHours[moment(quotedTweet.created_at).hour()]++;
	// 			return quotedTweet;
	// 		});
	// 	setQuotedTweetsTime(tempHours);
	// }, [quotedTweets, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	// useEffect(() => {
	// 	const tempHours = Array(24).fill(0);

	// 	tweets
	// 		.filter((tweet) => {
	// 			return (showVerifiedUsers && tweet.userType === 'verified') || (showUnverifiedUsers && tweet.userType === 'unverified');
	// 		})
	// 		.map((tweet) => {
	// 			tempHours[moment(tweet.created_at).hour()]++;
	// 			return tweet;
	// 		});

	// 	setTweetsTime(tempHours);
	// }, [tweets, isTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	return (
		<Row className="mx-0">
			<Col>
				<Row>
					<Col>
						{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
						) : (
							<strong>
								{bestHours.map((hour, i) => {
									return i !== bestHours.length - 1 ? <span key={i}>{hour}, </span> : <span key={i}>{hour}</span>;
								})}
							</strong>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best hour(s) to tweet (on average)</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<Button id="time-today" onClick={() => setShowChart(!showChart)} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>
						<ModalXLarge title={'Best Hour Details'} showChart={showChart} onHide={() => setShowChart(false)}>
							<ContainerDimensions>
								{({ width, height }) => (
									<>
										<Row>
											<Col className="text-center p-0 mx-0 ">
												<h6>Best Hour</h6>
												<D3Chart
													id="d3-hour-chart"
													label="# of Statuses"
													tickFormat={hourTickFormat}
													height={width * 0.5}
													width={width}
													data={[
														{ show: showAllStatuses, type: 'all', datum: statusesTime },
														{ show: showRetweets, type: 'retweets', datum: retweetsTime },
														{ show: showTweets, type: 'tweets', datum: tweetsTime },
														{ show: showQuotedTweets, type: 'quoted', datum: quotedTweetsTime },
													]}
												/>
											</Col>
										</Row>
										<Filters
											showAllStatuses={showAllStatuses}
											showTweets={showTweets}
											showRetweets={showRetweets}
											showQuotedTweets={showQuotedTweets}
											showBothUserTypes={showBothUserTypes}
											showVerifiedUsers={showVerifiedUsers}
											showUnverifiedUsers={showUnverifiedUsers}
											toggleStatus={toggleStatus}
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

export default Time;
