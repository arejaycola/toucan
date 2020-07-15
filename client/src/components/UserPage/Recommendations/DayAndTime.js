import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import ContainerDimensions from 'react-container-dimensions';
import { Col, Row, Button } from 'react-bootstrap';

import { TweetContext } from '../../../contexts/TweetContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { UserTypeContext } from '../../../contexts/UserTypeContext';
import { StatusContext } from '../../../contexts/StatusContext';

import Loader from 'react-loader-spinner';
import D3Chart from '../../helpers/D3Chart';
import Filters from './Filters';
import ModalXLarge from '../../ModalXLarge';

import useUserTypeToggleHelper from '../../../hooks/useUserTypeToggleHelper';
import useToggleUserType from '../../../hooks/useToggleUserType';
import useToggleStatus from '../../../hooks/useToggleStatus';

const TimeToday = ({ viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);
	const { showBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeContext);
	const { showAllStatuses, showRetweets, showQuotedTweets, showTweets } = useContext(StatusContext);

	const [bestDays, setBestDays] = useState([]);
	const [bestHours, setBestHours] = useState([]);
	const [showChart, setShowChart] = useState(false);

	const [allStatusesHour, setAllStatusesHour] = useState(Array(24).fill(0));
	const [allStatusesDay, setAllStatusesDay] = useState(Array(7).fill(0));

	const [retweetsDay, setRetweetsDay] = useState(Array(7).fill(0));
	const [retweetsHour, setRetweetsHour] = useState(Array(24).fill(0));

	const [quotedTweetsDay, setQuotedTweetsDay] = useState(Array(7).fill(0));
	const [quotedTweetsHour, setQuotedTweetsHour] = useState(Array(24).fill(0));

	const [tweetsDay, setTweetsDay] = useState(Array(7).fill(0));
	const [tweetsHour, setTweetsHour] = useState(Array(24).fill(0));

	const { toggleUserType } = useToggleUserType();
	const { toggleStatus } = useToggleStatus();

	useUserTypeToggleHelper();

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};

	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
			return '12am';
		}

		return moment().hour(d).format('h');
	};

	useEffect(() => {
		if (statuses.length > 0) {
			const tempDaysForStats = Array(7).fill(0);
			const tempDaysForGraphing = Array(7).fill(0);

			const tempHoursForStats = Array(24).fill(0);
			const tempHoursForGraphing = Array(24).fill(0);

			/* Keep track of statuses by day. */
			// let tempStatuses =
			statuses.map((status) => {
				tempDaysForStats[moment(status.created_at).weekday()]++;
				tempHoursForStats[moment(status.created_at).hour()]++;
				return status.created_at;
			});

			statuses
				.filter((status) => {
					return (showVerifiedUsers && status.userType === 'verified') || (showUnverifiedUsers && status.userType === 'unverified');
				})
				.map((status) => {
					tempDaysForGraphing[moment(status.created_at).weekday()]++;
					tempHoursForGraphing[moment(status.created_at).hour()]++;
					return status.created_at;
				});

			/* Find the maxium number of tweets in any day. */
			const maxDay = Math.max(...tempDaysForStats);

			/* Find all occurances of max. */
			const tempBestDays = tempDaysForStats.reduce((a, e, i) => {
				if (e === maxDay) {
					a.push(moment().set('day', i).weekday());
				}
				return a;
			}, []);

			setBestDays(tempBestDays);
			setAllStatusesDay(tempDaysForGraphing);

			const maxHour = Math.max(...tempHoursForStats);

			/* Find all occurances of max. */
			const tempBestHours = tempHoursForStats.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);
			setAllStatusesHour(tempHoursForGraphing);
		}
	}, [statuses, isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		retweets
			.filter((retweet) => {
				return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
			})
			.map((retweet) => {
				tempDay[moment(retweet.created_at).weekday()]++;
				tempHour[moment(retweet.created_at).hour()]++;
				return retweet;
			});

		setRetweetsDay(tempDay);
		setRetweetsHour(tempHour);
	}, [retweets, isRetweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		quotedTweets
			.filter((retweet) => {
				return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
			})
			.map((quotedTweet) => {
				tempDay[moment(quotedTweet.created_at).weekday()]++;
				tempHour[moment(quotedTweet.created_at).hour()]++;
				return quotedTweet;
			});

		setQuotedTweetsDay(tempDay);
		setQuotedTweetsHour(tempHour);
	}, [quotedTweets, isQuotedTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		tweets
			.filter((tweet) => {
				return (showVerifiedUsers && tweet.userType === 'verified') || (showUnverifiedUsers && tweet.userType === 'unverified');
			})
			.map((tweet) => {
				tempDay[moment(tweet.created_at).weekday()]++;
				tempHour[moment(tweet.created_at).hour()]++;
				return tweet;
			});

		setTweetsDay(tempDay);
		setTweetsHour(tempHour);
	}, [tweets, tweets, isTweetsLoading, showVerifiedUsers, showUnverifiedUsers]);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
						) : (
							<strong>
								{bestDays.map((day, i) => {
									return i !== bestDays.length - 1 ? (
										<span key={i}>{moment().weekday(day).format('dddd')}, </span>
									) : (
										<span key={i}>{moment().weekday(day).format('dddd')} </span>
									);
								})}
								{bestHours.map((hour, i) => {
									return i !== bestHours.length - 1 ? <span key={i}>at {hour}, </span> : <span key={i}>at {hour}</span>;
								})}
							</strong>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best day and hour to tweet</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<Button id="day-time" onClick={() => setShowChart(!showChart)} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						<ModalXLarge title={'Best Day and Hour Details'} showChart={showChart} onHide={() => setShowChart(false)}>
							<ContainerDimensions>
								{({ width, height }) => {
									height = width * 0.2;
									if (width < 600) {
										height = width - 100;
									}

									return (
										<>
											<Row>
												<Col className="text-center p-0 mx-0 ">
													<h6>Best Day</h6>
													<D3Chart
														id="d3-day-time-day-chart"
														label="# of Statuses"
														tickFormat={dayTickFormat}
														width={width}
														height={height}
														data={[
															{ show: showAllStatuses, type: 'all', datum: allStatusesDay },
															{ show: showRetweets, type: 'retweets', datum: retweetsDay },
															{ show: showTweets, type: 'tweets', datum: tweetsDay },
															{ show: showQuotedTweets, type: 'quoted', datum: quotedTweetsDay },
														]}
													/>
												</Col>
												<Col className="text-center p-0 mx-0 ">
													<h6>Best Hour</h6>
													<D3Chart
														id="d3-day-time-hours-chart"
														label="# of Statuses"
														tickFormat={hourTickFormat}
														width={width}
														height={height}
														data={[
															{ show: showAllStatuses, type: 'all', datum: allStatusesHour },
															{ show: showRetweets, type: 'retweets', datum: retweetsHour },
															{ show: showTweets, type: 'tweets', datum: tweetsHour },
															{ show: showQuotedTweets, type: 'quoted', datum: quotedTweetsHour },
														]}
													/>
												</Col>
											</Row>
											<Filters
												showAllStatuses={showAllStatuses}
												showRetweets={showRetweets}
												showTweets={showTweets}
												showQuotedTweets={showQuotedTweets}
												showBothUserTypes={showBothUserTypes}
												showVerifiedUsers={showVerifiedUsers}
												showUnverifiedUsers={showUnverifiedUsers}
												toggleStatus={toggleStatus}
												toggleUserType={toggleUserType}
											/>
										</>
									);
								}}
							</ContainerDimensions>
						</ModalXLarge>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
