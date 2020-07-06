import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const RetweetHelper = ({ addToGlobalCount }) => {
	const { retweets, setRetweets, setRetweetsCount, setRetweetsToUnverifiedCount, setVerifiedRetweetsTime, setUnverifiedRetweetsTime } = useContext(
		TweetContext
	);
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
				retweet.userType = 'verified';
			} else {
				tempUnverifiedDay[tempMoment.weekday()]++;
				tempUnverifiedHour[tempMoment.hour()]++;
				unverifiedMentionCount++;
				retweet.userType = 'unverified';
			}
		});

		setRetweetsToUnverifiedCount(unverifiedMentionCount);
		setVerifiedRetweetsTime(tempVerifiedHour);
		setUnverifiedRetweetsTime(tempUnverifiedHour);
		setVerifiedDay(tempVerifiedDay);
		setUnverifiedDay(tempUnverifiedDay);
		setVerifiedHour(tempVerifiedHour);
		setUnverifiedHour(tempUnverifiedHour);

		setRetweets(retweets);

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

	return null;
};

export default RetweetHelper;
