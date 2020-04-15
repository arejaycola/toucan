import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../contexts/TweetContext';
import D3Chart from './D3Chart';

const QuotedTweetChart = () => {
	const { quotedTweets, setQuotedTweetsCount, setQuotedTweetsToUnverifiedCount } = useContext(TweetContext);

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
		<div style={{ textAlign: 'center' }}>
			<p>Quoted Tweet Chart</p>
			<D3Chart id="d3-quoted-tweet-chart-day" tickFormat={dayTickFormat} dataVerified={verifiedDay} dataUnverified={unverifiedDay} />
			<D3Chart id="d3-quoted-tweet-chart-hour" tickFormat={hourTickFormat} dataVerified={verifiedHour} dataUnverified={unverifiedHour} />
			{/* <D3RetweetChartDay data={props.retweets} /> */}
		</div>
	);
};

export default QuotedTweetChart;
