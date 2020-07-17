import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TweetContext } from '../../contexts/TweetContext';
import UserStatsPanel from './UserStatsPanel';
import UserChartsPanel from './UserChartsPanel';
import Axios from 'axios';
import useStatusFetcher from '../../hooks/useStatusFetcher';

const UserPage = (props) => {
	const history = useHistory();
	const userId = props.match.params.id;
	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	const [user, setUser] = useState({});
	const { fetchInitialStatuses, fetchStatuses } = useStatusFetcher(userId);

	useLayoutEffect(() => {
		const getUserData = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
		};

		getUserData();

		const ws = new WebSocket(`ws://localhost:5000/echo`);

		ws.onopen = async () => {
			ws.send(JSON.stringify({ autoFetch: true, userId: userId, numberOfTweets: 3200 }));
		};

		ws.onmessage = (event) => {
			const { percentDone, response, status } = JSON.parse(event.data);
			if (status !== 'done') {
				fetchStatuses(response);
			}
		};
	}, []);

	return (
		<>
			<UserStatsPanel user={user} />
			<UserChartsPanel user={user} />
		</>
	);
};

export default UserPage;
