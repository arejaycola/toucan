import React, { useContext } from 'react';
import TweetHelper from '../helpers/TweetHelper';
import RetweetHelper from '../helpers/RetweetHelper';
import QuotedTweetHelper from '../helpers/QuotedTweetHelper';
import Recommendations from './Recommendations/Recommendations';
import { Container, Col, Row } from 'react-bootstrap';
import { LoadingContext } from '../../contexts/LoadingContext';

const UserChartsPanel = () => {
	const { setIsTweetsLoading, setIsRetweetsLoading, setIsQuotedTweetsLoading } = useContext(LoadingContext);

	/* TODO (07/15/2020 10:53) Set a max load time for users that only tweet certain types. */
	setTimeout(() => {
		setIsTweetsLoading(false);
		setIsRetweetsLoading(false);
		setIsQuotedTweetsLoading(false);
	}, 30000);

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
