import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import TimeToday from './TimeToday';

const Recommendations = () => {
	return (
		<Row>
			<Col>
				<h3>Recommendations</h3>
				<TimeToday />
				<DayAndTime />
			</Col>
		</Row>
	);
};

export default Recommendations;
