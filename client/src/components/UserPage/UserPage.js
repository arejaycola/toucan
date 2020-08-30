import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserStatsPanel from './UserStatsPanel';
import UserChartsPanel from './UserChartsPanel';

import Axios from 'axios';
import useStatusParser from '../../hooks/useStatusParser';
import { StatusContext } from '../../contexts/StatusContext';
import { RecommendationSettingsContext } from '../../contexts/RecommendationSettingsContext';

const UserPage = (props) => {
	const { autoFetch } = useContext(RecommendationSettingsContext);

	const history = useHistory();
	const userId = props.match.params.id;
	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');
	const { maxStatusCount, setMaxStatusCount } = useContext(StatusContext);
	const [user, setUser] = useState({});
	const { parseInitialStatuses, parseStatuses } = useStatusParser(userId);

	useLayoutEffect(() => {
		/* If the max status count is more than the max twitter will go back set it to the max. Else set it to the max number of statuses.  */
		maxStatusCount < 3200 ? setMaxStatusCount(props.location.state.maxStatusCount) : setMaxStatusCount(3200);

		const getUserData = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
		};

		getUserData();

		const ws = new WebSocket(`ws://localhost:5000/echo`);

		ws.onopen = async () => {
			/* TODO (07/31/2020 12:54) numberOfTweets will eventually be the max statuses count */
			ws.send(JSON.stringify({ autoFetch: true, userId: userId, numberOfTweets: 300 }));
		};

		ws.onmessage = (event) => {
			const { percentDone, response, status, initialFetch } = JSON.parse(event.data);
			
			// console.log(status, initialFetch, response);
			if (status !== 'done') {
				if (initialFetch) {
					console.log(response.length);
					parseInitialStatuses(response);
				} else {
					console.log(response.length);
					parseStatuses(response);
				}
			}
		};
	}, []);

	// useEffect(() => {
	// 	console.log('AF', autoFetch);
	// }, [autoFetch]);

	return (
		<>
			<UserStatsPanel user={user} />
			<UserChartsPanel user={user} />
		</>
	);
};

export default UserPage;
