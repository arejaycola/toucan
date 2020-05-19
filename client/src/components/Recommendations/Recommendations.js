import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import Time from './Time';
import TimeToday from './TimeToday';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Recommendations = () => {
	const onSettingsClick = () => {
		console.log('tehe');
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
					<DayAndTime />
				</Col>
				<Col className="mb-3" sm={4}>
					<TimeToday />
				</Col>
				<Col className="mb-3" sm={4}>
					<Time />
				</Col>
			</Row>
		</>
	);
};

export default Recommendations;
