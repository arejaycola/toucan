import React, { useLayoutEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserStatsPanel from './UserStatsPanel';
import UserChartsPanel from './UserChartsPanel';

import Axios from 'axios';
import useStatusParser from '../../hooks/useStatusParser';
import { TweetContext } from '../../contexts/TweetContext';

const UserPage = (props) => {
	const { setPercentLoaded } = useContext(TweetContext);

	const history = useHistory();
	const userId = props.match.params.id;
	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');
	const [user, setUser] = useState({});
	const { parseInitialStatuses, parseStatuses } = useStatusParser(userId);

	useLayoutEffect(() => {
		const fetchData = async () => {
			/* TODO (08/30/2020 22:11) This may be getting called a bunch unneccessarily Maybe store this in context somewhere so it will only be called once? 
			Maybe investigate the new API to see if they are setting the verified flag on user_mentions attached to tweets (if that is the problem)*/
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			let maxStatusCount = -1;
			let statusesCount = -1;

			setUser(response.data);
			statusesCount = response.data.statuses_count;

			/* If the max status count is more than the max twitter will go back set it to the max. Else set it to the max number of statuses.  */
			statusesCount < 3200 ? (maxStatusCount = statusesCount) : (maxStatusCount = 3200);
			const host = document.location.origin.replace(/^http/, 'ws').replace('3000', '5000');
			console.log(host);
			const ws = new WebSocket(`${host}/echo`);

			ws.onopen = async () => {
				/* TODO (08/30/2020 22:26) Make numberOfTweets = maxStatusesCount when done testing*/
				ws.send(JSON.stringify({ autoFetch: true, userId: userId, numberOfTweets: 500 }));
			};

			ws.onmessage = (event) => {
				const { percentDone, response, status, initialFetch } = JSON.parse(event.data);

				if (response) {
					if (status !== 'done') {
						setPercentLoaded(Math.round(percentDone * 100));

						if (initialFetch) {
							parseInitialStatuses(response);
						} else {
							parseStatuses(response);
						}
					}
				}
				if (status === 'done') {
					console.log('done!');
					setPercentLoaded(100);
				}
			};
		};

		fetchData();
	}, []);

	return (
		<>
			<UserStatsPanel user={user} />
			<UserChartsPanel user={user} />
		</>
	);
};

export default UserPage;
