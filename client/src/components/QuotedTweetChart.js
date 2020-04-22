import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../contexts/TweetContext';
import D3Chart from './D3Chart';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

const QuotedTweetChart = () => {
	const { quotedTweets, setQuotedTweetsCount, setQuotedTweetsToUnverifiedCount } = useContext(TweetContext);

	const [hasVerifiedDay, setHasVerifiedDay] = useState(false);
	const [hasVerifiedHour, setHasVerifiedHour] = useState(false);

	const [verifiedDay, setVerifiedDay] = useState(Array(7).fill(0));
	const [unverifiedDay, setUnverifiedDay] = useState(Array(7).fill(0));
	const [verifiedHour, setVerifiedHour] = useState(Array(24).fill(0));
	const [unverifiedHour, setUnverifiedHour] = useState(Array(24).fill(0));

	let tempVerifiedDay = Array(7).fill(0);
	let tempUnverifiedDay = Array(7).fill(0);
	let tempVerifiedHour = Array(24).fill(0);
	let tempUnverifiedHour = Array(24).fill(0);

	let unverifiedMentionCount = 0;

	useEffect(() => {
		setQuotedTweetsCount(quotedTweets.length);

		quotedTweets.map((quotedTweet) => {
			let tempMoment = moment(new Date(quotedTweet.created_at));

			if (quotedTweet.quoted_status.user.verified) {
				tempVerifiedDay[tempMoment.weekday()]++;
				tempVerifiedHour[tempMoment.hour()]++;
			} else {
				tempUnverifiedDay[tempMoment.weekday()]++;
				tempUnverifiedHour[tempMoment.hour()]++;
				unverifiedMentionCount++;
			}
		});

		setQuotedTweetsToUnverifiedCount(unverifiedMentionCount);
		setVerifiedDay(tempVerifiedDay);
		setUnverifiedDay(tempUnverifiedDay);
		setVerifiedHour(tempVerifiedHour);
		setUnverifiedHour(tempUnverifiedHour);

		if (quotedTweets.length > 0) {
			/* Add a small delay for effect. */
			setHasVerifiedDay(true);
			setHasVerifiedHour(true);
		}
	}, [quotedTweets]);

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
						<h4>Quoted Tweets</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6>By Day</h6>
						{hasVerifiedDay ? (
							<D3Chart
								id="d3-quoted-tweet-chart-day"
								label="# of Quoted Tweets"
								tickFormat={dayTickFormat}
								dataVerified={verifiedDay}
								dataUnverified={unverifiedDay}
							/>
						) : (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={3000} />
						)}
					</Col>
					<Col>
						<h6>By Hour</h6>
						{hasVerifiedHour ? (
							<D3Chart
								id="d3-quoted-tweet-chart-hour"
								label="# of Quoted Tweets"
								tickFormat={hourTickFormat}
								dataVerified={verifiedHour}
								dataUnverified={unverifiedHour}
							/>
						) : (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={3000} />
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default QuotedTweetChart;
