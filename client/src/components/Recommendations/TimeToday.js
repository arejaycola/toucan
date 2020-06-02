import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';
import D3Chart from '../charts/D3Chart';
import ModalXLarge from '../ModalXLarge';

const TimeToday = ({ viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses } = useContext(TweetContext);

	const [bestHours, setBestHours] = useState([]);
	const [hoursForGraphing, setHoursForGraphing] = useState(Array(24).fill(0));
	const [showChart, setShowChart] = useState(false);

	const tempHoursToday = Array(24).fill(0);
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
			setHoursForGraphing(tempHoursToday);
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
								<D3Chart
									id="d3-time-today-chart"
									label="# of Statuses"
									tickFormat={hourTickFormat}
									data={[{ type: 'dark-gray', datum: hoursForGraphing }]}
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
