import React, { useContext } from 'react';
import TweetHelper from './helpers/TweetHelper';
import RetweetHelper from './helpers/RetweetHelper';
import QuotedTweetHelper from './helpers/QuotedTweetHelper';
import Recommendations from './Recommendations/Recommendations';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../contexts/TweetContext';

const UserChartsPanel = (props) => {
	const { setGlobalVerifiedDayCount, setGlobalVerifiedHourCount, setGlobalUnverifiedDayCount, setGlobalUnverifiedHourCount } = useContext(
		TweetContext
	);

	const addToGlobalCount = ({ verifiedDay, unverifiedDay, verifiedHour, unverifiedHour }) => {
		setGlobalVerifiedDayCount((old) => {
			const tempArray = [];

			for (let i = 0; i < verifiedDay.length; i++) {
				tempArray[i] = verifiedDay[i] + old[i];
			}
			return tempArray;
		});

		setGlobalUnverifiedDayCount((old) => {
			const tempArray = [];

			for (let i = 0; i < unverifiedDay.length; i++) {
				tempArray[i] = unverifiedDay[i] + old[i];
			}
			return tempArray;
		});

		setGlobalVerifiedHourCount((old) => {
			const tempArray = [];

			for (let i = 0; i < verifiedHour.length; i++) {
				tempArray[i] = verifiedHour[i] + old[i];
			}
			return tempArray;
		});

		setGlobalUnverifiedHourCount((old) => {
			const tempArray = [];

			for (let i = 0; i < unverifiedHour.length; i++) {
				tempArray[i] = unverifiedHour[i] + old[i];
			}
			return tempArray;
		});
	};

	TweetHelper({ addToGlobalCount });
	RetweetHelper({ addToGlobalCount });
	QuotedTweetHelper({ addToGlobalCount });

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
