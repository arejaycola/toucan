import React, { useContext } from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
const UserChartsPanel = (props) => {
	return (
		<div className="charts-container">
			<TweetChart user={props.user} />
			<RetweetChart />
			<QuotedTweetChart user={props.user} />
		</div>
	);
};

export default UserChartsPanel;
