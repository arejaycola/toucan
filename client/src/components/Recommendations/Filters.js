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
					<Form.Check type="switch" checked={showAllStatuses} id="show-all-status" label="All" onChange={(e) => toggleStatus(e)} />
					<Form.Check type="switch" checked={showTweets} id="show-tweets" label="Tweets" onChange={(e) => toggleStatus(e)} />
					<Form.Check type="switch" checked={showRetweets} id="show-retweets" label="Retweets" onChange={(e) => toggleStatus(e)} />
					<Form.Check
						type="switch"
						checked={showQuotedTweets}
						id="show-quoted-tweets"
						label="Quoted Tweets"
						onChange={(e) => toggleStatus(e)}
					/>
				</Col>
				<Col xs={'auto'} className="text-left">
					<h5>User Type</h5>
					{/* <Form.Check checked={showBothUserTypes} type="switch" id="show-both-user" label="Both" onChange={(e) => toggleUserType(e)} /> */}
					{/* <Form.Check checked={showVerifiedUsers} type="switch" id="show-verified" label="Verified" onChange={(e) => toggleUserType(e)} /> */}
					{/* <Form.Check checked={showUnverifiedUsers} type="switch" id="show-unverified" label="Unverified" onChange={(e) => toggleUserType(e)} /> */}
				</Col>
			</Row>
		</>
	);
};

export default Filters;
