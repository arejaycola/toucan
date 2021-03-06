import { useEffect, useContext } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { InitialStatusContext } from '../../contexts/InitialStatusContext';

const QuotedTweetHelper = () => {
	const { setQuotedTweets, setQuotedTweetsCount, setQuotedTweetsToUnverifiedCount } = useContext(TweetContext);
	const { initialQuotedTweets, } = useContext(InitialStatusContext);
	const { setIsQuotedTweetsLoading } = useContext(LoadingContext);

	let tempVerifiedDay = Array(7).fill(0);
	let tempUnverifiedDay = Array(7).fill(0);
	let tempVerifiedHour = Array(24).fill(0);
	let tempUnverifiedHour = Array(24).fill(0);

	let unverifiedMentionCount = 0;

	useEffect(() => {
		setQuotedTweetsCount(initialQuotedTweets.length);

		initialQuotedTweets.map((quotedTweet) => {
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
			return quotedTweet;
		});

		setQuotedTweetsToUnverifiedCount(unverifiedMentionCount);
		setQuotedTweets(initialQuotedTweets);

		if (initialQuotedTweets.length > 0) {
			setIsQuotedTweetsLoading(false);
		}
	}, [initialQuotedTweets]);

	return null;
};

export default QuotedTweetHelper;
