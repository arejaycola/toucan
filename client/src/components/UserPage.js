import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TweetContext } from '../contexts/TweetContext';
import UserStatsPanel from '../components/UserStatsPanel';
import UserChartsPanel from '../components/UserChartsPanel';
import Axios from 'axios';

const UserPage = (props) => {
	const history = useHistory();
	const userId = props.match.params.id;

	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	const [user, setUser] = useState({});
	const { setTweets, setRetweets, setQuotedTweets, setStatuses } = useContext(TweetContext);

	useEffect(() => {
		const sendUserRequest = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
		};

		const sendUserStatusRequest = async () => {
			const numberOfTweets = 200;

			const response = await Axios.get(`/api/twitter/user/${userId}/tweets/${numberOfTweets}`);
			// setTweets(response.data);
			let tempRetweets = [];
			let tempTweets = [];
			let tempQuotedTweets = [];
			let tempStatuses = [];
			/* Compartmentalize the different types of tweets (statuses) */
			response.data.map((status) => {
				if (status.retweeted_status) {
					/* Retweeted status->user->verified */
					tempRetweets.push(status);
					tempStatuses.push(status);
				} else if (status.quoted_status) {
					/* Quoted status->user->verified. */
					tempQuotedTweets.push(status);
					tempStatuses.push(status);
				} else {
					/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
					tempTweets.push(status);
					tempStatuses.push(status);
				}
			});

			setStatuses(tempStatuses);
			setTweets(tempTweets);
			setRetweets(tempRetweets);
			setQuotedTweets(tempQuotedTweets);
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
