import { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const QuotedTweetHelper = ({ addToGlobalCount }) => {
	const {
		quotedTweets,
		setQuotedTweets,
		setQuotedTweetsCount,
		setQuotedTweetsToUnverifiedCount,
		setVerifiedQuotedTime,
		setUnverifiedQuotedTime,
	} = useContext(TweetContext);
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
				quotedTweet.userType = 'verified';
			} else {
				tempUnverifiedDay[tempMoment.weekday()]++;
				tempUnverifiedHour[tempMoment.hour()]++;
				unverifiedMentionCount++;
				quotedTweet.userType = 'unverified';
			}
		});

		setQuotedTweetsToUnverifiedCount(unverifiedMentionCount);
		setVerifiedQuotedTime(tempVerifiedHour);
		setUnverifiedQuotedTime(tempUnverifiedHour);

		setVerifiedDay(tempVerifiedDay);
		setUnverifiedDay(tempUnverifiedDay);
		setVerifiedHour(tempVerifiedHour);
		setUnverifiedHour(tempUnverifiedHour);

		setQuotedTweets(quotedTweets);

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

	return null;
};

export default QuotedTweetHelper;
