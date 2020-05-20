import React, { useContext } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import Time from './Time';
import TimeToday from './TimeToday';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ChartContext } from '../../contexts/ChartContext';

const Recommendations = () => {
	const { showTimeTodayChart, setShowTimeTodayChart } = useContext(ChartContext);

	const onSettingsClick = () => {
		console.log('tehe');
	};

	const onViewClick = (id) => {
		if (id === 'time-today') {
			setShowTimeTodayChart(true);
		} else if (id === 'day-time') {
		} else if (id === 'time') {
		}
	};

	return (
		<>
			<Row className="mb-4">
				<Col className="text-center">
					<h3>
						Recommendations
						<a title="Adjust recommendation engine" style={{ cursor: 'pointer' }}>
							<FontAwesomeIcon onClick={onSettingsClick} style={{ marginLeft: '10px' }} icon={faCog} />
						</a>
					</h3>
				</Col>
			</Row>
			<Row className="text-center">
				<Col className="mb-3" sm={4}>
					<DayAndTime onViewClick={onViewClick} />
				</Col>
				<Col className="mb-3" sm={4}>
					<TimeToday onViewClick={onViewClick} />
					{showTimeTodayChart ? 'Show Chart' : null}
				</Col>
				<Col className="mb-3" sm={4}>
					<Time onViewClick={onViewClick} />
				</Col>
			</Row>
		</>
	);
};

export default Recommendations;
