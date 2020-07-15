import React, { useEffect } from 'react';

import { Row, Container } from 'react-bootstrap';
import TweetStatsContainer from './TweetStatsContainer';
import UserDetailsPanel from './UserDetailsPanel';
import ProfileImage from './ProfileImage';

const UserStatsPanel = (props) => {
	useEffect(() => {
		/* Move the window to the top so scroll position isn't preserved */
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container className=" mt-0 mt-md-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<Row className="mx-0">
				<ProfileImage user={props.user} />
				<UserDetailsPanel user={props.user} />
				<TweetStatsContainer user={props.user} />
			</Row>
		</Container>
	);
};

export default UserStatsPanel;
