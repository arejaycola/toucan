import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';

const TimeToday = () => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses } = useContext(TweetContext);

	const [bestHours, setBestHours] = useState([]);

	const tempHoursToday = Array(24).fill(0);

	useEffect(() => {
		if (statuses.length > 0) {
			let createdOnThisDay = statuses.filter((status) => {
				return moment(status.created_at).weekday() === moment().weekday();
			});

			createdOnThisDay.map((t) => {
				tempHoursToday[moment(t.created_at).hour()]++;
			});

			const maxHour = Math.max(...tempHoursToday);

			/* Find all occurances of max. */
			const tempBestHours = tempHoursToday.reduce((a, e, i) => {
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
						Best hour(s) to tweet today:&nbsp;
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
						) : (
							<strong>
								{bestHours.map((hour, i) => {
									return i != bestHours.length - 1 ? <span key={i}>{hour}, </span> : <span key={i}>{hour}</span>;
								})}
							</strong>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
