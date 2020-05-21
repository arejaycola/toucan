import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';
import D3Chart from '../charts/D3Chart';

const Time = ({ onViewClick }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const { globalUnverifiedHourCount, globalVerifiedHourCount } = useContext(TweetContext);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const [maxHour, setMaxHour] = useState(-1);
	const [hoursForGraphing, setHoursForGraphing] = useState(Array(24).fill(0));
	const [showChart, setShowChart] = useState(false);

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

	useEffect(() => {
		if (!isTweetsLoading && !isRetweetsLoading && !isQuotedTweetsLoading) {
			console.log(globalUnverifiedHourCount);
			console.log(globalVerifiedHourCount);

			const tempArray = Array(24).fill(0);
			for (let i = 0; i < globalVerifiedHourCount.length; i++) {
				tempArray[i] = globalVerifiedHourCount[i] + globalUnverifiedHourCount[i];
			}

			setHoursForGraphing(tempArray);
			const max = tempArray.indexOf(Math.max(...tempArray));
			setMaxHour(max);
		}
	}, [globalUnverifiedHourCount, globalVerifiedHourCount]);

	const bestHour = moment().set('hour', maxHour).set('minute', 0).format('hh:mm A');

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						{maxHour === -1 ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={15000} />
						) : (
							<strong>{bestHour}</strong>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best hour to tweet (on average)</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<Button id="time-today" onClick={onToggleViewClick}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						{showChart ? (
							<D3Chart
								id="d3-time-today-chart"
								label="# of Statuses"
								tickFormat={hourTickFormat}
								data={[{ type: 'dark-gray', datum: hoursForGraphing }]}
							/>
						) : null}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Time;
