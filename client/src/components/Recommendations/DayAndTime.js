import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import moment from 'moment'


const DayAndTime = () => {
    const dayOfWeek = moment().format('dddd');
    const dayNumber = moment().weekday();


	return (
		<Row>
			<Col>
				<div>DayAndTime</div>
                {dayOfWeek}{dayNumber}
			</Col>
		</Row>
	);
};

export default DayAndTime;
