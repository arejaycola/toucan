import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';
import D3Chart from '../helpers/D3Chart';
import Filters from './Filters';
import ModalXLarge from '../ModalXLarge';

const TimeToday = ({ onViewClick, viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);

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

	const [showAllStatuses, setShowAllStatuses] = useState(true);
	const [showRetweets, setShowRetweets] = useState(false);
	const [showQuotedTweets, setShowQuotedTweets] = useState(false);
	const [showTweets, setShowTweets] = useState(false);

	const [showBothUserTypes, setShowBothUserTypes] = useState(true);
	const [showVerifiedUsers, setShowVerifiedUsers] = useState(false);
	const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(false);

	const onToggleViewClick = () => {
		setShowChart(!showChart);
	};

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

	const toggleStatus = (e) => {
		if (e.target.id === 'show-all-status') {
			setShowAllStatuses(!showAllStatuses);
		} else if (e.target.id === 'show-tweets') {
			setShowTweets(!showTweets);
		} else if (e.target.id === 'show-retweets') {
			setShowRetweets(!showRetweets);
		} else if (e.target.id === 'show-quoted-tweets') {
			setShowQuotedTweets(!showQuotedTweets);
		}
	};

	const toggleUserType = (e) => {
		if (e.target.id === 'show-both-users') {
			setShowBothUserTypes(!showBothUserTypes);
		} else if (e.target.id === 'show-verified') {
			setShowVerifiedUsers(!showVerifiedUsers);
		} else if (e.target.id === 'show-unverified') {
			setShowUnverifiedUsers(!showUnverifiedUsers);
		}
	};
	useEffect(() => {
		if (statuses.length > 0) {
			const tempDays = Array(7).fill(0);
			const tempHours = Array(24).fill(0);

			/* Keep track of statuses by day. */
			// let tempStatuses =
			statuses.map((status) => {
				tempDays[moment(status.created_at).weekday()]++;
				tempHours[moment(status.created_at).hour()]++;
				return status.created_at;
			});

			/* Find the maxium number of tweets in any day. */
			const maxDay = Math.max(...tempDays);

			/* Find all occurances of max. */
			const tempBestDays = tempDays.reduce((a, e, i) => {
				if (e === maxDay) {
					a.push(moment().set('day', i).weekday());
				}
				return a;
			}, []);

			/* Return the statuses from any day with the max (in case the max happened on more than one day.) This currently only handles one max day */
			// let tweetsFromBestDay = tempBestDays.map((day) => {
			// 	return tempStatuses.filter((status) => {
			// 		return moment(status).weekday() === day;
			// 	});
			// })[0];

			setBestDays(tempBestDays);
			setAllStatusesDay(tempDays);

			const maxHour = Math.max(...tempHours);

			/* Find all occurances of max. */
			const tempBestHours = tempHours.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);
			setAllStatusesHour(tempHours);
		}
	}, [statuses]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		retweets.map((retweet) => {
			tempDay[moment(retweet.created_at).weekday()]++;
			tempHour[moment(retweet.created_at).hour()]++;
		});

		setRetweetsDay(tempDay);
		setRetweetsHour(tempHour);
	}, [retweets]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		quotedTweets.map((quotedTweet) => {
			tempDay[moment(quotedTweet.created_at).weekday()]++;
			tempHour[moment(quotedTweet.created_at).hour()]++;
		});

		setQuotedTweetsDay(tempDay);
		setQuotedTweetsHour(tempHour);
		console.log(quotedTweets);
	}, [quotedTweets]);

	useEffect(() => {
		let tempDay = Array(7).fill(0);
		let tempHour = Array(24).fill(0);

		tweets.map((tweet) => {
			tempDay[moment(tweet.created_at).weekday()]++;
			tempHour[moment(tweet.created_at).hour()]++;
		});

		setTweetsDay(tempDay);
		setTweetsHour(tempHour);
	}, [tweets]);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
						) : (
							<strong>
								{bestDays.map((day, i) => {
									return i != bestDays.length - 1 ? (
										<span key={i}>{moment().weekday(day).format('dddd')}, </span>
									) : (
										<span key={i}>{moment().weekday(day).format('dddd')} </span>
									);
								})}
								{bestHours.map((hour, i) => {
									return i != bestHours.length - 1 ? <span key={i}>at {hour}, </span> : <span key={i}>at {hour}</span>;
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
						<Button id="day-time" onClick={onToggleViewClick} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						{showChart ? (
							<ModalXLarge title={'Best Day and Hour Details'} showChart={showChart} onHide={() => setShowChart(false)}>
								<Row>
									<Col className="text-center p-0 mx-0 ">
										<h6>Best Day</h6>
										<D3Chart
											id="d3-day-time-day-chart"
											label="# of Statuses"
											tickFormat={dayTickFormat}
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
									toggleStatus={toggleStatus}
									toggleUserType={toggleUserType}
								/>
							</ModalXLarge>
						) : null}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
