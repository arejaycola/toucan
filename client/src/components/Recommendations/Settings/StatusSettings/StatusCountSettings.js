import React, { useState } from 'react';
import { Col, Row, FormCheck, Form } from 'react-bootstrap';

const StatusCountSettings = () => {
	const [min, setMin] = useState(1);
	const [max, setMax] = useState(500);
	const [statusCount, setStatusCount] = useState(Math.floor((min + max) / 2));

	return (
		<>
			<Row className="mt-5 justify-content-center">
				<Col xs={'auto'} className="text-right px-0 mx-0">
					<h5>Number of Statuses</h5>
				</Col>
				<Col xs={'auto'} className="ml-0">
					<FormCheck id="show-all-status" type="switch" custom>
						<FormCheck.Label id="show-all-status">
							<FormCheck.Input readOnly id="show-all-status" />
						</FormCheck.Label>
					</FormCheck>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form.Group className="mx-5 my-0 py-0">
						<Form.Label></Form.Label>
						<Form.Control
							min={min}
							max={max}
							step={10}
							type="range"
							value={statusCount}
							onChange={(e) => setStatusCount(e.target.value)}
						/>
					</Form.Group>
					<Row className="text-center mx-5 mt-0 pt-0">
						<Col className="d-flex px-0 mx-0 justify-content-start">{min}</Col>
						<Col className="d-flex px-0 mx-0 justify-content-end">{max}</Col>
					</Row>
				</Col>
			</Row>
			<Row className="text-center">
				<Col>
					<h6>
						Current Value: <strong>{statusCount}</strong>
					</h6>
				</Col>
			</Row>
		</>
	);
};
export default StatusCountSettings;
