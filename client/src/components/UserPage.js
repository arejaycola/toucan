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

	useEffect(() => {
		const sendRequest = async () => {
			const response = await Axios.get(`/api/twitter/user/${userId}`);
			setUser(response.data);
			console.log(response.data);
		};

		sendRequest();
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
					<UserChartsPanel user={user} />
				</div>
				<p>Test {props.match.params.id}</p>
			</div>
		</div>
	);
};

export default UserPage;
