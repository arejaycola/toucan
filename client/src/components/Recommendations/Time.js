import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';

const Time = ({onViewClick}) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const { globalUnverifiedHourCount } = useContext(TweetContext);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const [maxHour, setMaxHour] = useState(-1);

	useEffect(() => {
		console.log(!isTweetsLoading , !isRetweetsLoading , !isQuotedTweetsLoading);
		if (!isTweetsLoading && !isRetweetsLoading && !isQuotedTweetsLoading) {
			const globalCount = globalUnverifiedHourCount;
			const max = globalCount.indexOf(Math.max(...globalCount));
			setMaxHour(max);
		}
	}, [globalUnverifiedHourCount]);

	const bestHour = moment().set('hour', maxHour).set('minute', 0).format('hh:mm A');

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{maxHour == -1 ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={15000} />
						) : (
							<strong>{bestHour}</strong>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best hour to tweet (on average)</Col>
				</Row>
				<Row className='mt-1'>
					<Col>
						<Button id="time" onClick={(e) => onViewClick("time")}>View</Button>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Time;
