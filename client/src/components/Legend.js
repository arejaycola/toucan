import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

const Legend = () => {
	return (
		<Row className="justify-content-center text-center">
			<Col xs={2}>
				<Row>
					<Col>
						<FontAwesomeIcon className="unverified" icon={faSquareFull} />
					</Col>
				</Row>
				<Row>
					<Col>Unverified</Col>
				</Row>
			</Col>
			<Col xs={2}>
				<Row>
					<Col>
						<FontAwesomeIcon className="verified" icon={faSquareFull} />
					</Col>
				</Row>
				<Row>
					<Col>Verified</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Legend;
