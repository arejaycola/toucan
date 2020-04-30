import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import Loader from 'react-loader-spinner';

const TimeToday = () => {
	const [timedOut, setTimedOut] = useState(false);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const dayOfWeek = moment().format('dddd');
	// const dayNumber = moment().weekday();
	const { globalUnverifiedHourCount } = useContext(TweetContext);
	const bestHour = moment()
		.set('hour', globalUnverifiedHourCount.indexOf(Math.max(...globalUnverifiedHourCount)))
		.set('minute', 0)
		.format('HH:mm A');

	setTimeout(() => {
		setTimedOut(true);
	}, 3000);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						<p>
							Best hour to tweet today:{' '}
							{!timedOut ? (
								<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
							) : (
								<strong>{bestHour}</strong>
							)}
						</p>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
