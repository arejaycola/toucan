import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { TweetContext } from '../contexts/TweetContext';
import D3Chart from './D3Chart';
import Loader from 'react-loader-spinner';

const TotalChart = ({ verifiedDay, verifiedHour, unverifiedDay, unverifiedHour }) => {
	const { tweets, setTweetsCount, setTweetsToUnverifiedCount } = useContext(TweetContext);

	const [hasVerifiedDay, setHasVerifiedDay] = useState(false);
	const [hasVerifiedHour, setHasVerifiedHour] = useState(false);
	console.log(unverifiedHour);
	// const [verifiedDay, setVerifiedDay] = useState(Array(7).fill(0));
	// const [unverifiedDay, setUnverifiedDay] = useState(Array(7).fill(0));
	// const [verifiedHour, setVerifiedHour] = useState(Array(24).fill(0));
	// const [unverifiedHour, setUnverifiedHour] = useState(Array(24).fill(0));

	// let tempVerifiedDay = Array(7).fill(0);
	// let tempUnverifiedDay = Array(7).fill(0);
	// let tempVerifiedHour = Array(24).fill(0);
	// let tempUnverifiedHour = Array(24).fill(0);
	// let unverifiedMentionCount = 0;

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d == 12) {
			return '12 pm';
		} else if (d == 0) {
			return '12am';
		}

		return moment().hour(d).format('hh');
	};

	return (
		<Row className="mt-3 text-center justify-content-center">
			<Col>
				<Row>
					<Col>
						<h4>Total Statuses</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6>By Day</h6>
						<D3Chart
							id="d3-total-status-chart-day"
							label="# of Statuses"
							tickFormat={dayTickFormat}
							dataVerified={verifiedDay}
							dataUnverified={unverifiedDay}
						/>
					</Col>
					<Col>
						<h6>By Hour</h6>
						<D3Chart
							id="d3-total-status-chart-hour"
							label="# of Tweets"
							tickFormat={hourTickFormat}
							dataVerified={verifiedHour}
							dataUnverified={unverifiedHour}
						/>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TotalChart;
