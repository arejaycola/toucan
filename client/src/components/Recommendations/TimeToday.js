import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';
import D3Chart from '../charts/D3Chart';
import ModalXLarge from '../ModalXLarge';
import Filters from './Filters';

const TimeToday = ({ viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets } = useContext(TweetContext);

	const [bestHours, setBestHours] = useState([]);
	const [hoursForGraphing, setHoursForGraphing] = useState(Array(24).fill(0));
	const [showChart, setShowChart] = useState(false);

	const [retweetsToday, setRetweetsToday] = useState(Array(24).fill(0));
	const [quotedTweetsToday, setQuotedTweetsToday] = useState(Array(24).fill(0));
	const [showAllStatuses, setShowAllStatuses] = useState(true);
	const [showRetweets, setShowRetweets] = useState(false);
	const [showQuotedTweets, setShowQuotedTweets] = useState(false);

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

	const toggleStatus = (e) => {
		if (e.target.id === 'show-all-status') {
			setShowAllStatuses(!showAllStatuses);
		} else if (e.target.id === 'show-tweets') {
			// setShowTweets(!showTweets);
		} else if (e.target.id === 'show-retweets') {
			setShowRetweets(!showRetweets);
		} else if (e.target.id === 'show-quoted-tweets') {
			setShowQuotedTweets(!showQuotedTweets);
		}
	};

	useEffect(() => {
		if (statuses.length > 0) {
			let temp = Array(24).fill(0);

			/* Only return statuses from today*/
			statuses
				.filter((status) => {
					return moment(status.created_at).weekday() === moment().weekday();
				})
				.map((t) => {
					temp[moment(t.created_at).hour()]++;
				});

			const maxHour = Math.max(...temp);

			/* Find all occurances of max. */
			const tempBestHours = temp.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);

			setHoursForGraphing(temp);
		}
	}, [statuses]);

	useEffect(() => {
		let temp = Array(24).fill(0);

		retweets
			.filter((retweet) => {
				return moment(retweet.created_at).weekday() === moment().weekday();
			})
			.map((retweet) => {
				temp[moment(retweet.created_at).hour()]++;
			});

		setRetweetsToday(temp);
	}, [retweets]);

	useEffect(() => {
		let temp = Array(24).fill(0);
		quotedTweets
			.filter((quotedTweet) => {
				return moment(quotedTweet.created_at).weekday() === moment().weekday();
			})
			.map((quotedTweet) => {
				temp[moment(quotedTweet.created_at).hour()]++;
			});

		setQuotedTweetsToday(temp);
	}, [quotedTweets]);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
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
						<Button id="time-today" onClick={onToggleViewClick} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						{showChart ? (
							<ModalXLarge title={'Best Time Today Details'} showChart={showChart} onHide={() => setShowChart(false)}>
								<Row>
									<Col className="text-center">
										<h6>Best Hour Today</h6>

										<D3Chart
											id="d3-time-today-chart"
											label="# of Statuses w/ User Mention"
											tickFormat={hourTickFormat}
											data={[
												{ show: showAllStatuses, type: 'all', datum: hoursForGraphing },
												{ show: showRetweets, type: 'verified-retweets-time', datum: retweetsToday },
												// { show: showTweets, type: 'verified-tweets-time', datum: verifiedTweetsTime },
												{ show: showQuotedTweets, type: 'verified-quoted-time', datum: quotedTweetsToday },
											]}
										/>
									</Col>
								</Row>
								<Filters showAllStatuses={showAllStatuses} showRetweets={showRetweets} toggleStatus={toggleStatus} />
							</ModalXLarge>
						) : null}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
