import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';

const TimeToday = () => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	let { statuses } = useContext(TweetContext);

	const [bestDays, setBestDays] = useState([]);
	const [bestHours, setBestHours] = useState([]);

	const tempDays = Array(7).fill(0);
	const tempHours = Array(24).fill(0);

	useEffect(() => {
		if (statuses.length > 0) {
			/* Keep track of statuses by day. */
			statuses = statuses.map((status) => {
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
				return statuses.filter((status) => {
					return moment(status).weekday() === day;
				});
			})[0];

			setBestDays(tempBestDays);

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
		}
	}, [statuses]);

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
						<Button>View</Button>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
