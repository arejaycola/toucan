import { useContext } from 'react';
import { TweetContext } from '../contexts/TweetContext';
import { InitialStatusContext } from '../contexts/InitialStatusContext';

const useStatusParser = () => {
	const { setTweets, setRetweets, setQuotedTweets, setStatuses, setMasterStatuses } = useContext(TweetContext);
	const { setInitialQuotedTweets, setInitialRetweets, setInitialStatuses, setInitialTweets } = useContext(InitialStatusContext);

	const parseInitialStatuses = async (response) => {
		// const response = await Axios.get(`/api/twitter/user/${userId}/tweets/${numberOfTweets}`);
		let tempInitialRetweets = [];
		let tempInitialTweets = [];
		let tempInitialQuotedTweets = [];
		let tempInitialStatuses = [];

		let tempMasterStatuses = [];

		/* Compartmentalize the different types of tweets (statuses) */
		response.map((status) => {
			status.userType = null;
			if (status.retweeted_status) {
				/* Retweeted status->user->verified */
				if (status.retweeted_status.user.verified) {
					status.userType = 'verified';
				} else {
					status.userType = 'unverified';
				}

				tempInitialRetweets.push(status);
				tempInitialStatuses.push(status);

				tempMasterStatuses.push(status);
			} else if (status.quoted_status) {
				/* Quoted status->user->verified. */
				if (status.quoted_status.user.verified) {
					status.userType = 'verified';
				} else {
					status.userType = 'unverified';
				}

				tempInitialQuotedTweets.push(status);
				tempInitialStatuses.push(status);

				tempMasterStatuses.push(status);
			} else if (status.entities.user_mentions.length > 0) {
				/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
				tempInitialTweets.push(status);
				tempInitialStatuses.push(status);

				tempMasterStatuses.push(status);
			}

			return status;
		});

		setInitialStatuses((oldStatuses) => [...oldStatuses, ...tempInitialStatuses]);
		setInitialTweets((oldTweets) => [...oldTweets, ...tempInitialTweets]);
		setInitialRetweets((oldRetweets) => [...oldRetweets, ...tempInitialRetweets]);
		setInitialQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...tempInitialQuotedTweets]);

		setMasterStatuses((oldStatuses) => [...oldStatuses, ...tempMasterStatuses]);
	};

	const parseStatuses = async (data) => {
		let tempRetweets = [];
		let tempTweets = [];
		let tempQuotedTweets = [];
		let tempStatuses = [];

		let tempMasterStatuses = [];

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

				tempMasterStatuses.push(status);
			} else if (status.quoted_status) {
				/* Quoted status->user->verified. */
				if (status.quoted_status.user.verified) {
					status.userType = 'verified';
				} else {
					status.userType = 'unverified';
				}

				tempQuotedTweets.push(status);
				tempStatuses.push(status);

				tempMasterStatuses.push(status);
			} else if (status.entities.user_mentions.length > 0) {
				/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
				tempTweets.push(status);
				tempStatuses.push(status);

				tempMasterStatuses.push(status);
			}

			return status;
		});

		setStatuses((oldStatuses) => [...oldStatuses, ...tempStatuses]);
		setTweets((oldTweets) => [...oldTweets, ...tempTweets]);
		setRetweets((oldRetweets) => [...oldRetweets, ...tempRetweets]);
		setQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...tempQuotedTweets]);

		setMasterStatuses((oldStatuses) => [...oldStatuses, ...tempMasterStatuses]);
	};

	return { parseInitialStatuses, parseStatuses };
};

export default useStatusParser;
