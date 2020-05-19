import React, { useContext, useState, useEffect } from 'react';
import TotalChart from './TotalChart';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
import Recommendations from './Recommendations/Recommendations';
import Legend from './Legend';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../contexts/TweetContext';

const UserChartsPanel = (props) => {
	const {
		globalVerifiedDayCount,
		setGlobalVerifiedDayCount,
		globalVerifiedHourCount,
		setGlobalVerifiedHourCount,
		globalUnverifiedDayCount,
		setGlobalUnverifiedDayCount,
		globalUnverifiedHourCount,
		setGlobalUnverifiedHourCount,
	} = useContext(TweetContext);

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

	return (
		<Container fluid="lg" className="mt-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<Row>
				<Col>
					<Recommendations />
				</Col>
			</Row>

			<div className="d-none">
				<Legend />
				<TotalChart
					verifiedDay={globalVerifiedDayCount}
					unverifiedDay={globalUnverifiedDayCount}
					verifiedHour={globalVerifiedHourCount}
					unverifiedHour={globalUnverifiedHourCount}
					user={props.user}
				/>
			</div>
			<div className="d-none">
				<TweetChart addToGlobalCount={addToGlobalCount} user={props.user} />
			</div>
			<div className="d-none">
				<RetweetChart className="d-none" addToGlobalCount={addToGlobalCount} />
			</div>
			<div className="d-none">
				<QuotedTweetChart className="d-none" addToGlobalCount={addToGlobalCount} user={props.user} />
			</div>
		</Container>
	);
};

export default UserChartsPanel;
