import { useContext, useEffect } from 'react';
import { TweetContext } from '../contexts/TweetContext';
import Axios from 'axios';

const useStatusFetcher = (userId) => {
	const { setTweets, setRetweets, tweets, retweets, setQuotedTweets, quotedTweets, statuses, setStatuses } = useContext(TweetContext);

	const fetchInitialStatuses = async (numberOfTweets) => {
		const response = await Axios.get(`/api/twitter/user/${userId}/tweets/${numberOfTweets}`);
		fetchStatuses(response.data);
	};

	const fetchStatuses = async (data) => {
		let tempRetweets = [];
		let tempTweets = [];
		let tempQuotedTweets = [];
		let tempStatuses = [];
		/* Compartmentalize the different types of tweets (statuses) */
		data.map((status) => {
			status.userType = null;
			if (status.retweeted_status) {
				/* Retweeted status->user->verified */
				if (status.retweeted_status.user.verified) {
					status.userType = 'verified';
				} else {
					status.userType = 'unverified';
				}

				tempRetweets.push(status);
				tempStatuses.push(status);
			} else if (status.quoted_status) {
				/* Quoted status->user->verified. */
				if (status.quoted_status.user.verified) {
					status.userType = 'verified';
				} else {
					status.userType = 'unverified';
				}

				tempQuotedTweets.push(status);
				tempStatuses.push(status);
			} else if (status.entities.user_mentions.length > 0) {
				/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
				tempTweets.push(status);
				tempStatuses.push(status);
			}

			return status;
		});

		setStatuses((oldStatuses) => [...oldStatuses, ...tempStatuses]);
		setTweets((oldTweets) => [...oldTweets, ...tempTweets]);
		setRetweets((oldRetweets) => [...oldRetweets, ...tempRetweets]);
		setQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...tempQuotedTweets]);
	};

	return { fetchInitialStatuses, fetchStatuses };
};

export default useStatusFetcher;
