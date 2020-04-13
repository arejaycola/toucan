import React from 'react';
import TweetChart from './TweetChart';
import RetweetChart from './RetweetChart';
import QuotedTweetChart from './QuotedTweetChart';
const UserChartsPanel = (props) => {
	return (
		<div className="charts-container">
			<TweetChart tweets={props.tweets} user={props.user} />
			<RetweetChart retweets={props.retweets} user={props.user} />
			<QuotedTweetChart quotedTweets={props.quotedTweets} user={props.user} />
		</div>
	);
};

export default UserChartsPanel;
