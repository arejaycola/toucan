import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import D3Chart from './D3Chart';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';

const RetweetChart = ({ addToGlobalCount }) => {
	const { retweets, setRetweetsCount, setRetweetsToUnverifiedCount } = useContext(TweetContext);
	const { isRetweetsLoading, setIsRetweetsLoading } = useContext(LoadingContext);

	const [verifiedDay, setVerifiedDay] = useState(Array(7).fill(0));
	const [unverifiedDay, setUnverifiedDay] = useState(Array(7).fill(0));
	const [verifiedHour, setVerifiedHour] = useState(Array(24).fill(0));
	const [unverifiedHour, setUnverifiedHour] = useState(Array(24).fill(0));

	let unverifiedMentionCount = 0;

	useEffect(() => {
		let tempVerifiedDay = Array(7).fill(0);
		let tempUnverifiedDay = Array(7).fill(0);
		let tempVerifiedHour = Array(24).fill(0);
		let tempUnverifiedHour = Array(24).fill(0);

		setRetweetsCount(retweets.length);

		retweets.map((retweet) => {
			let tempMoment = moment(new Date(retweet.created_at));
			if (retweet.retweeted_status.user.verified) {
				tempVerifiedDay[tempMoment.weekday()]++;
				tempVerifiedHour[tempMoment.hour()]++;
			} else {
				tempUnverifiedDay[tempMoment.weekday()]++;
				tempUnverifiedHour[tempMoment.hour()]++;
				unverifiedMentionCount++;
			}
		});

		setRetweetsToUnverifiedCount(unverifiedMentionCount);
		setVerifiedDay(tempVerifiedDay);
		setUnverifiedDay(tempUnverifiedDay);
		setVerifiedHour(tempVerifiedHour);
		setUnverifiedHour(tempUnverifiedHour);

		if (retweets.length > 0) {
			/* Add a small delay for effect. */
			setIsRetweetsLoading(false);
		}

		addToGlobalCount({
			verifiedDay: tempVerifiedDay,
			unverifiedDay: tempUnverifiedDay,
			verifiedHour: tempVerifiedHour,
			unverifiedHour: tempUnverifiedHour,
		});
	}, [retweets]);

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
			return '12am';
		}

		return moment().hour(d).format('h');
	};

	return (
		<Row className="mt-3 text-center justify-content-center">
			<Col>
				<Row>
					<Col>
						<h4>Retweets</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6>By Day</h6>
						{isRetweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={10000} />
						) : (
							<D3Chart
								id="d3-retweet-chart-day"
								label="# of Retweets"
								tickFormat={dayTickFormat}
								dataVerified={verifiedDay}
								dataUnverified={unverifiedDay}
							/>
						)}
					</Col>
					<Col>
						<h6>By Hour</h6>
						{isRetweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={10000} />
						) : (
							<D3Chart
								id="d3-retweet-chart-hour"
								label="# of Retweets"
								tickFormat={hourTickFormat}
								dataVerified={verifiedHour}
								dataUnverified={unverifiedHour}
							/>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default RetweetChart;
