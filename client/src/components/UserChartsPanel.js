import React from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
const UserChartsPanel = (props) => {
	return (
		<div>
			<TweetChart tweets={props.tweets} user={props.user}/>
			<RetweetChart user={props.user} />
			<p>{props.user.name}</p>
		</div>
	);
};

export default UserChartsPanel;
