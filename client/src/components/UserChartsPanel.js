import React from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
import Legend from './Legend';

const UserChartsPanel = (props) => {
	return (
		<div className="charts-container">
			<TweetChart user={props.user} />
			<RetweetChart />
			<QuotedTweetChart user={props.user} />
			<Legend />
		</div>
	);
};

export default UserChartsPanel;
