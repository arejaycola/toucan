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
	const [quoted, setQuoted] = useState([]);

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
			let tempQuoted = [];

			// console.log(response.data);
			let a = response.data.map((status) => {
				if (status.retweeted_status) {
					/* Retweeted status->user->verified */
					tempRetweets.push(status);
				} else if (status.quoted_status) {
					/* Quoted status->user->verified. */
					tempQuoted.push(status);
				} else {
					/* Entities ->user_mentions->go through list get id, perform a search for that id -> verified */
					tempTweets.push(status);
				}
				// return status.retweeted_status
			});
			console.log(tempRetweets);
			console.log(tempQuoted);
			console.log(tempTweets);
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
					<UserChartsPanel tweets={tweets} user={user} />
				</div>
				<p>Test {props.match.params.id}</p>
			</div>
		</div>
	);
};

export default UserPage;
