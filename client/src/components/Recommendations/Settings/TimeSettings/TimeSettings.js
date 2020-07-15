import React from 'react';
import { Col, Row, FormCheck, Form } from 'react-bootstrap';
import TimeTable from './TimeTable';

const TimeSettings = () => {
	return (
		<>
			<Row className="justify-content-center">
				<Col xs={'auto'} className="text-right px-0 mx-0">
					<h5>Time</h5>
				</Col>
				<Col xs={'auto'} className="ml-0">
					<FormCheck id="show-all-status" type="switch" custom>
						<FormCheck.Label id="show-all-status">
							<FormCheck.Input readOnly id="show-all-status" />
						</FormCheck.Label>
					</FormCheck>
				</Col>
			</Row>
			<Row className="mx-5">
				<Col>
					<TimeTable />
				</Col>
			</Row>
		</>
	);
};
export default TimeSettings;
