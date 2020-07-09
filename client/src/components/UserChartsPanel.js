import React, { useContext } from 'react';
import TweetHelper from './helpers/TweetHelper';
import RetweetHelper from './helpers/RetweetHelper';
import QuotedTweetHelper from './helpers/QuotedTweetHelper';
import Recommendations from './Recommendations/Recommendations';
import { Container, Col, Row } from 'react-bootstrap';

const UserChartsPanel = () => {

	TweetHelper();
	RetweetHelper();
	QuotedTweetHelper();

	return (
		<Container className="mt-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<Row className="mx-0">
				<Col>
					<Recommendations />
				</Col>
			</Row>
		</Container>
	);
};

export default UserChartsPanel;
