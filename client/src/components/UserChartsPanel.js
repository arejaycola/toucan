import React from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
import Legend from './Legend';
import { Container, Col, Row } from 'react-bootstrap';

const UserChartsPanel = (props) => {


	


	return (
		<Container fluid="lg" className="mt-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<Legend />
			<TweetChart user={props.user} />
			<RetweetChart />
			<QuotedTweetChart user={props.user} />
		</Container>
	);
};

export default UserChartsPanel;
