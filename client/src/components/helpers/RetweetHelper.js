import { useEffect, useContext } from 'react';
import moment from 'moment';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { InitialStatusContext } from '../../contexts/InitialStatusContext';

const RetweetHelper = () => {
	const {  setRetweets, setRetweetsCount, setRetweetsToUnverifiedCount } = useContext(TweetContext);
	const { initialRetweets } = useContext(InitialStatusContext);
	const { setIsRetweetsLoading } = useContext(LoadingContext);

	let unverifiedMentionCount = 0;
	useEffect(() => {
		let tempVerifiedDay = Array(7).fill(0);
		let tempUnverifiedDay = Array(7).fill(0);
		let tempVerifiedHour = Array(24).fill(0);
		let tempUnverifiedHour = Array(24).fill(0);

		setRetweetsCount(initialRetweets.length);

		initialRetweets.map((retweet) => {
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

			return retweet;
		});

		setRetweetsToUnverifiedCount(unverifiedMentionCount);
		setRetweets(initialRetweets);

		if (initialRetweets.length > 0) {
			/* Add a small delay for effect. */
			setIsRetweetsLoading(false);
		}
	}, [initialRetweets]);


	return null;
};

export default RetweetHelper;
