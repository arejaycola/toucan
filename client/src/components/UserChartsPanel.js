import React from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
const UserChartsPanel = (props) => {
	return (
		<div>
			<TweetChart />
			<RetweetChart />
			<p>{props.user.name}</p>
		</div>
	);
};

export default UserChartsPanel;
