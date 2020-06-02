import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import D3Chart from './D3Chart';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';

const QuotedTweetChart = ({ addToGlobalCount }) => {
	const { quotedTweets, setQuotedTweetsCount, setQuotedTweetsToUnverifiedCount, setVerifiedQuotedTime, setUnverifiedQuotedTime } = useContext(
		TweetContext
	);
	const { isQuotedTweetsLoading, setIsQuotedTweetsLoading } = useContext(LoadingContext);

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
		setVerifiedQuotedTime(tempVerifiedHour);
		setUnverifiedQuotedTime(tempUnverifiedHour);

		setVerifiedDay(tempVerifiedDay);
		setUnverifiedDay(tempUnverifiedDay);
		setVerifiedHour(tempVerifiedHour);
		setUnverifiedHour(tempUnverifiedHour);

		if (quotedTweets.length > 0) {
			setIsQuotedTweetsLoading(false);
		}

		addToGlobalCount({
			verifiedDay: tempVerifiedDay,
			unverifiedDay: tempUnverifiedDay,
			verifiedHour: tempVerifiedHour,
			unverifiedHour: tempUnverifiedHour,
		});
	}, [quotedTweets]);

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
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
						{isQuotedTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={30000} />
						) : (
							<D3Chart
								id="d3-quoted-tweet-chart-day"
								label="# of Quoted Tweets"
								tickFormat={dayTickFormat}
								data={[
									{ type: 'verified', datum: verifiedDay },
									{ type: 'unverified', datum: unverifiedDay },
								]}
							/>
						)}
					</Col>
					<Col>
						<h6>By Hour</h6>
						{isQuotedTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={30000} />
						) : (
							<D3Chart
								id="d3-quoted-tweet-chart-hour"
								label="# of Quoted Tweets"
								tickFormat={hourTickFormat}
								data={[
									{ type: 'verified', datum: verifiedHour },
									{ type: 'unverified', datum: unverifiedHour },
								]}
							/>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default QuotedTweetChart;
