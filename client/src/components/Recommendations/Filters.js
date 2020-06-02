import React from 'react';
import { Col, Row, Button, Modal, Form } from 'react-bootstrap';

const Filters = ({ toggleStatus, toggleUserType, showAllStatuses, showTweets, showRetweets, showQuotedTweets }) => {
	return (
		<>
			<Row className="text-center">
				<Col>
					<h3>Filters</h3>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs={'auto'} className="text-left">
					<h5>Status Type</h5>
					<Form.Check type="switch" checked={showAllStatuses} id="show-all-status" label="All" onClick={(e) => toggleStatus(e)} />
					<Form.Check type="switch" checked={showTweets} id="show-tweets" label="Tweets" onClick={(e) => toggleStatus(e)} />
					<Form.Check type="switch" checked={showRetweets} id="show-retweets" label="Retweets" onClick={(e) => toggleStatus(e)} />
					<Form.Check
						type="switch"
						checked={showQuotedTweets}
						id="show-quoted-tweets"
						label="Quoted Tweets"
						onClick={(e) => toggleStatus(e)}
					/>
				</Col>
				<Col xs={'auto'} className="text-left">
					<h5>User Type</h5>
					<Form.Check type="switch" id="show-all-user" label="All" onClick={(e) => toggleUserType(e)} />
					<Form.Check type="switch" id="show-verified" label="Verified" onClick={(e) => toggleUserType(e)} />
					<Form.Check type="switch" id="show-unverified" label="Unverified" onClick={(e) => toggleUserType(e)} />
				</Col>
			</Row>
		</>
	);
};

export default Filters;
