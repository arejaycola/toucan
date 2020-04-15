import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../contexts/TweetContext';
import D3Chart from './D3Chart';

const RetweetChart = () => {
	const { retweets, setRetweetsCount, setRetweetsToUnverifiedCount } = useContext(TweetContext);

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
		<div style={{ textAlign: 'center' }}>
			<p>Retweet Chart</p>
			<D3Chart id="d3-retweet-chart-day" tickFormat={dayTickFormat} dataVerified={verifiedDay} dataUnverified={unverifiedDay} />
			<D3Chart id="d3-retweet-chart-hour" tickFormat={hourTickFormat} dataVerified={verifiedHour} dataUnverified={unverifiedHour} />
			{/* <D3RetweetChartDay data={props.retweets} /> */}
		</div>
	);
};

export default RetweetChart;
