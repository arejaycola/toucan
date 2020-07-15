import React, { useLayoutEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TweetContext } from '../../contexts/TweetContext';
import { MaxStatusesContext } from '../../contexts/MaxStatusesContext';
import UserStatsPanel from './UserStatsPanel';
import UserChartsPanel from './UserChartsPanel';
import Axios from 'axios';

const UserPage = (props) => {
	const history = useHistory();
	const userId = props.match.params.id;
	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	const [user, setUser] = useState({});
	const { setTweets, setRetweets, setQuotedTweets, setStatuses } = useContext(TweetContext);
	const { setMaxStatusCount } = useContext(MaxStatusesContext);

	useLayoutEffect(() => {
		const sendUserRequest = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
			setMaxStatusCount(response.data.statuses_count);
		};

		const sendUserStatusRequest = async () => {
			const numberOfTweets = 500;

			const response = await Axios.get(`/api/twitter/user/${userId}/tweets/${numberOfTweets}`);
			let tempRetweets = [];
			let tempTweets = [];
			let tempQuotedTweets = [];
			let tempStatuses = [];

			/* Compartmentalize the different types of tweets (statuses) */
			response.data.map((status) => {
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

			setStatuses(tempStatuses);
			setTweets(tempTweets);
			setRetweets(tempRetweets);
			setQuotedTweets(tempQuotedTweets);
			console.log(tempStatuses.length);
		
		};

		sendUserRequest();
		sendUserStatusRequest();
	}, []);

	return (
		<>
			<UserStatsPanel user={user} />
			<UserChartsPanel user={user} />
		</>
	);
};

export default UserPage;
