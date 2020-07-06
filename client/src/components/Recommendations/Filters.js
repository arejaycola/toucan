import React from 'react';
import { Col, Row, Button, Modal, Form, FormCheck } from 'react-bootstrap';

const Filters = ({
	toggleStatus,
	toggleUserType,
	showAllStatuses,
	showTweets,
	showRetweets,
	showQuotedTweets,
	showBothUserTypes,
	showVerifiedUsers,
	showUnverifiedUsers,
}) => {
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
					<FormCheck onChange={(e) => toggleStatus(e)} id="show-all-status" type="switch" custom>
						<FormCheck.Input readOnly id="show-all-status" checked={showAllStatuses} />
						<FormCheck.Label id="show-all-status" onClick={(e) => toggleStatus(e)}>
							All
						</FormCheck.Label>
					</FormCheck>
					<FormCheck onChange={(e) => toggleStatus(e)} id="show-tweets" type="switch" custom>
						<FormCheck.Input readOnly id="show-tweets" checked={showTweets} />
						<FormCheck.Label id="show-tweets" onClick={(e) => toggleStatus(e)}>
							Tweets
						</FormCheck.Label>
					</FormCheck>
					<FormCheck onChange={(e) => toggleStatus(e)} id="show-retweets" type="switch" custom>
						<FormCheck.Input readOnly id="show-retweets" checked={showRetweets} />
						<FormCheck.Label id="show-retweets" onClick={(e) => toggleStatus(e)}>
							Retweets
						</FormCheck.Label>
					</FormCheck>

					<FormCheck onChange={(e) => toggleStatus(e)} id="show-quoted-tweets" type="switch" custom>
						<FormCheck.Input readOnly id="show-quoted-tweets" checked={showQuotedTweets} />
						<FormCheck.Label id="show-quoted-tweets" onClick={(e) => toggleStatus(e)}>
							Quoted Tweets
						</FormCheck.Label>
					</FormCheck>
				</Col>
				<Col xs={'auto'} className="text-left">
					<h5>User Type</h5>
					<Form.Check checked={showBothUserTypes} type="switch" id="show-both-users" label="Both" onChange={(e) => toggleUserType(e)} />
					<Form.Check checked={showVerifiedUsers} type="switch" id="show-verified" label="Verified" onChange={(e) => toggleUserType(e)} />
					<Form.Check
						checked={showUnverifiedUsers}
						type="switch"
						id="show-unverified"
						label="Unverified"
						onChange={(e) => toggleUserType(e)}
					/>
				</Col>
			</Row>
		</>
	);
};

export default Filters;
