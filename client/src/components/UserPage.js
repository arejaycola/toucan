import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TweetContext } from '../contexts/TweetContext';
import BannerImage from '../components/BannerImage';
import UserStatsPanel from '../components/UserStatsPanel';
import ProfileImage from '../components/ProfileImage';
import UserChartsPanel from '../components/UserChartsPanel';
import Axios from 'axios';
import { Container } from 'react-bootstrap';

const UserPage = (props) => {
	const history = useHistory();
	const userId = props.match.params.id;

	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	const [user, setUser] = useState({});
	const { setTweets, setRetweets, setQuotedTweets } = useContext(TweetContext);

	useEffect(() => {
		const sendUserRequest = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
		};

		const sendUserTweetsRequest = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}/tweets`);
			// setTweets(response.data);
			let tempRetweets = [];
			let tempTweets = [];
			let tempQuotedTweets = [];

			/* Compartmentalize the different types of tweets (statuses) */
			response.data.map((status) => {
				if (status.retweeted_status) {
					/* Retweeted status->user->verified */
					tempRetweets.push(status);
				} else if (status.quoted_status) {
					/* Quoted status->user->verified. */
					tempQuotedTweets.push(status);
				} else {
					/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
					tempTweets.push(status);
				}
			});

			setTweets(tempTweets);
			setRetweets(tempRetweets);
			setQuotedTweets(tempQuotedTweets);
			// console.log('Retweets: ', tempRetweets);
			// console.log('Quoted Tweets: ', tempQuotedTweets);
			// console.log('Tweets: ', tempTweets);
		};

		sendUserRequest();
		sendUserTweetsRequest();
	}, []);

	return (
		<>
			<UserStatsPanel user={user} />
			<UserChartsPanel user={user} />
		</>
	);
};

export default UserPage;
