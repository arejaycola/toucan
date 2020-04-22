import React, { useState, useEffect } from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
import Legend from './Legend';
import { Container, Col, Row } from 'react-bootstrap';
import numeral from 'numeral';
import moment from 'moment';

const UserChartsPanel = (props) => {
	const [globalVerifiedDayCount, setGlobalVerifiedDayCount] = useState(Array(7).fill(0));
	const [globalVerifiedHourCount, setGlobalVerifiedHourCount] = useState(Array(24).fill(0));
	const [globalUnverifiedDayCount, setGlobalUnverifiedDayCount] = useState(Array(7).fill(0));
	const [globalUnverifiedHourCount, setGlobalUnverifiedHourCount] = useState(Array(24).fill(0));

	const [dayRatio, setDayRatio] = useState(Array(7).fill(0));
	const [hourRatio, setHourRatio] = useState(Array(24).fill(0));

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

	useEffect(() => {
		let day = [];
		let tempArray = [];
		let ratio = Array(7).fill(0);

		/* Combine the unverifiedDay and verifiedDay to see his most active day */
		for (let i = 0; i < globalVerifiedDayCount.length; i++) {
			tempArray[i] = globalVerifiedDayCount[i] + globalUnverifiedDayCount[i];
			ratio[i] = globalUnverifiedDayCount[i] / (globalVerifiedDayCount[i] + globalUnverifiedDayCount[i]);
		}

		day = tempArray.indexOf(Math.max(...tempArray));
		setDayRatio(ratio);
	}, [globalVerifiedDayCount, globalUnverifiedDayCount]);

	useEffect(() => {
		let hour = [];
		let tempArray = [];
		let ratio = Array(24).fill(0);
		/* Combine the unverifiedDay and verifiedDay to see his most active day */

		for (let i = 0; i < globalVerifiedHourCount.length; i++) {
			tempArray[i] = globalVerifiedHourCount[i] + globalUnverifiedHourCount[i];
			ratio[i] = globalUnverifiedHourCount[i] / (globalVerifiedHourCount[i] + globalUnverifiedHourCount[i]);

			if (isNaN(ratio[i])) {
				ratio[i] = 0;
			}
		}
		hour = tempArray.indexOf(Math.max(...tempArray));
		setHourRatio(ratio);
	}, [globalVerifiedHourCount, globalUnverifiedHourCount]);

	return (
		<Container fluid="lg" className="mt-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<p>
				Day with the highest percent of statuses to unverifed users:
				{moment()
					.weekday(dayRatio.indexOf(Math.max(...dayRatio)))
					.format('dddd')}
				({numeral(dayRatio[dayRatio.indexOf(Math.max(...dayRatio))]).format('0.00%')})
			</p>
			<p>
				Hour with the highest percent of statuses to unverifed users:
				{moment()
					.hour(hourRatio.indexOf(Math.max(...hourRatio)))
					.minute('00')
					.format('h:mm A')}
				({numeral(hourRatio[hourRatio.indexOf(Math.max(...hourRatio))]).format('0.00%')})
			</p>
			<Legend />
			<TweetChart addToGlobalCount={addToGlobalCount} user={props.user} />
			<RetweetChart addToGlobalCount={addToGlobalCount} />
			<QuotedTweetChart addToGlobalCount={addToGlobalCount} user={props.user} />
		</Container>
	);
};

export default UserChartsPanel;
