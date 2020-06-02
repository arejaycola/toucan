import React from 'react';
import { Col, Row, Button, Modal, Form } from 'react-bootstrap';

const Filters = () => {
	return (
		<>
			<Row className='text-center'>
				<Col>
					<h3>Filters</h3>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs={'auto'} className="text-left">
					<h5>Status Type</h5>
					<Form.Check type="switch" id="show-all-status" label="All" />
					<Form.Check type="switch" id="show-tweets" label="Tweets" />
					<Form.Check type="switch" id="show-retweets" label="Retweets" />
					<Form.Check type="switch" id="show-quoted-tweets" label="Quoted Tweets" />
				</Col>
				<Col xs={'auto'} className="text-left">
					<h5>User Type</h5>
					<Form.Check type="switch" id="show-all-user" label="All" />
					<Form.Check type="switch" id="show-verified" label="Verified" />
					<Form.Check type="switch" id="show-unverified" label="Unverified" />
				</Col>
			</Row>
		</>
	);
};

export default Filters;
