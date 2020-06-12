import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';
import D3Chart from '../charts/D3Chart';
import Filters from './Filters';
import ModalXLarge from '../ModalXLarge';

const TimeToday = ({ onViewClick, viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);

	const [bestDays, setBestDays] = useState([]);
	const [bestHours, setBestHours] = useState([]);
	const [showChart, setShowChart] = useState(false);
	const [hoursForGraphing, setHoursForGraphing] = useState(Array(24).fill(0));
	const [daysForGraphing, setDaysForGraphing] = useState(Array(7).fill(0));

	const [retweetsDay, setRetweetsDay] = useState(Array(7).fill(0));
	const [quotedTweetsToday, setQuotedTweetsToday] = useState(Array(24).fill(0));
	const [tweetsToday, setTweetsToday] = useState(Array(24).fill(0));

	const [showAllStatuses, setShowAllStatuses] = useState(true);
	const [showRetweets, setShowRetweets] = useState(false);
	const [showQuotedTweets, setShowQuotedTweets] = useState(false);
	const [showTweets, setShowTweets] = useState(false);

	const tempDays = Array(7).fill(0);
	const tempHours = Array(24).fill(0);

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
			// setShowTweets(!showTweets);
		} else if (e.target.id === 'show-retweets') {
			setShowRetweets(!showRetweets);
		} else if (e.target.id === 'show-quoted-tweets') {
			// setShowQuotedTweets(!showQuotedTweets);
		}
	};

	useEffect(() => {
		if (statuses.length > 0) {
			/* Keep track of statuses by day. */
			let tempStatuses = statuses.map((status) => {
				tempDays[moment(status.created_at).weekday()]++;
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

			/* Return the statuses from any day with the max (in case the max happened on more than one day.) */
			let tweetsFromBestDay = tempBestDays.map((day) => {
				return tempStatuses.filter((status) => {
					return moment(status).weekday() === day;
				});
			})[0];

			setBestDays(tempBestDays);
			setDaysForGraphing(tempDays);

			tweetsFromBestDay.map((t) => {
				tempHours[moment(t).hour()]++;
			});

			const maxHour = Math.max(...tempHours);

			/* Find all occurances of max. */
			const tempBestHours = tempHours.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);
			setHoursForGraphing(tempHours);
		}
	}, [statuses]);

	useEffect(() => {
		let temp = Array(7).fill(0);

		retweets.map((retweet) => {
			temp[moment(retweet.created_at).weekday()]++;
		});

		

		setRetweetsDay(temp);
	}, [retweets]);

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
									<Col className="text-center">
										<h6>Best Day</h6>
										<D3Chart
											id="d3-day-time-day-chart"
											label="# of Statuses"
											tickFormat={dayTickFormat}
											data={[
												{ show: showAllStatuses, type: 'all', datum: daysForGraphing },
												{ show: showRetweets, type: 'retweets', datum: retweetsDay },
												// { show: showTweets, type: 'tweets', datum: tweetsToday },
												// { show: showQuotedTweets, type: 'quoted', datum: quotedTweetsToday },
											]}
										/>
									</Col>
									<Col className="text-center">
										<h6>Best Hour</h6>
										<D3Chart
											id="d3-day-time-hours-chart"
											label="# of Statuses"
											tickFormat={hourTickFormat}
											data={[
												{ show: showAllStatuses, type: 'all', datum: hoursForGraphing },
												// { show: showRetweets, type: 'retweets', datum: retweetsToday },
												// { show: showTweets, type: 'tweets', datum: tweetsToday },
												// { show: showQuotedTweets, type: 'quoted', datum: quotedTweetsToday },
											]}
										/>
									</Col>
								</Row>
								<Filters showAllStatuses={showAllStatuses} toggleStatus={toggleStatus} />
							</ModalXLarge>
						) : null}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
