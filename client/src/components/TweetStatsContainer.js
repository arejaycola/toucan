import React, { useContext } from 'react';
import numeral from 'numeral';
import { TweetContext } from '../contexts/TweetContext';

const TweetStatsContainer = (props) => {
	const { tweets, quotedTweets, retweets, tweetsCount, tweetsToUnverifiedCount } = useContext(TweetContext);
	console.log(tweetsToUnverifiedCount, tweetsCount);
	return (
		<div className="tweet-stats-container">
			<h3>Tweet Trends</h3>
			<p className="short-line muted-small"> (Last ~1k Tweets)</p>
			<hr />
			<div className="line-1">
				<div className="total-tweets-container">
					<p className="">
						<strong>{numeral(tweetsToUnverifiedCount / tweetsCount).format('0.00%')}</strong>
					</p>
					<p className="short-line">% Tweets with Unverified User Mention</p>
				</div>
				<div className="total-retweets-container">
					<p className="short-line">
						<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
					</p>
					<p>Total Retweets</p>
				</div>
			</div>
			{/* <div className="line-2">
				<div className="total-tweets-container">
					<p className="short-line">
						<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
					</p>
					<p className="short-line">Tweets to Unverified Users</p>
					<p className="muted-small">(last 7 days)</p>
				</div>
				<div className="total-retweets-container">
					<p className="short-line">
						<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
					</p>
					<p className="short-line">Retweets to Unverified Users</p>
					<p className="muted-small">(last 7 days)</p>
				</div>
			</div> */}
		</div>
	);
};

export default TweetStatsContainer;
