import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';
import BannerImage from '../components/BannerImage';
import UserStatsPanel from '../components/UserStatsPanel';
import ProfileImage from '../components/ProfileImage';
import UserChartsPanel from '../components/UserChartsPanel';
import Axios from 'axios';

const UserPage = (props) => {
	const history = useHistory();
	const userId = props.match.params.id;

	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	const [user, setUser] = useState({});
	const [tweets, setTweets] = useState([]);
	const [retweets, setRetweets] = useState([]);
	const [quotedTweets, setQuotedTweets] = useState([]);

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
			console.log('Retweets: ', tempRetweets);
			console.log('Quoted Tweets: ', tempQuotedTweets);
			console.log('Tweets: ', tempTweets);
		};

		sendUserRequest();
		sendUserTweetsRequest();
	}, []);

	return (
		<div className="layout-container">
			<div className="banner-container">
				<BannerImage image={user.profile_banner_url} />
			</div>
			<div className="bottom-container">
				<div className="left-panel">
					<UserStatsPanel user={user} />
				</div>
				<div className="profile-image-container">
					<ProfileImage image={user.profile_image_url_https} />
				</div>
				<div className="right-panel">
					<UserChartsPanel tweets={tweets} retweets={retweets} quotedTweets={quotedTweets} user={user} />
				</div>
			</div>
		</div>
	);
};

export default UserPage;
