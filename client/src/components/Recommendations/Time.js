import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import Loader from 'react-loader-spinner';

const Time = () => {
	const [maxHour, setMaxHour] = useState(-1);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const { globalUnverifiedHourCount } = useContext(TweetContext);
	useEffect(() => {
		const globalCount = globalUnverifiedHourCount;
		const max = globalCount.indexOf(Math.max(...globalCount));
		// if(max > 0){
		// 	setMaxHour(max);
		// 	console.log(maxHour);

		// }
	}, [globalUnverifiedHourCount]);

	const bestHour = moment().set('hour', maxHour).set('minute', 0).format('HH:mm A');

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						Best hour to tweet:&nbsp;
						{maxHour == -1 ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={15000} />
						) : (
							<strong>{bestHour}</strong>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Time;
