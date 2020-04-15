import React, { useContext } from 'react';
import numeral from 'numeral';
import { TweetContext } from '../contexts/TweetContext';

const TweetStatsContainer = (props) => {
	const {
		tweets,
		quotedTweets,
		retweets,
		tweetsCount,
		tweetsToUnverifiedCount,
		retweetsCount,
		retweetsToUnverifiedCount,
		quotedTweetsCount,
		quotedTweetsToUnverifiedCount,
	} = useContext(TweetContext);

	const totalTweets = numeral(
		(tweetsToUnverifiedCount + retweetsToUnverifiedCount + quotedTweetsToUnverifiedCount) / (tweetsCount + retweetsCount + quotedTweetsCount)
	).format('0.00%');

	console.log(quotedTweetsToUnverifiedCount, quotedTweetsCount);
	return (
		<div className="tweet-stats-container">
			<h3>Tweet Trends</h3>
			<p className="short-line muted-small"> (Last ~1k Tweets)</p>
			<hr />
			<div className="line-1">
				<div className="tweet-mention-container">
					<p className="">
						<strong>{numeral(tweetsToUnverifiedCount / tweetsCount).format('0.00%')}</strong>
					</p>
					<p className="short-line">% Tweets with Unverified User Mention</p>
				</div>
				<div className="retweet-mention-container">
					<p className="">
						<strong>{numeral(retweetsToUnverifiedCount / retweetsCount).format('0.00%')}</strong>
					</p>
					<p className="short-line">% Retweets of Unverified User</p>
				</div>
			</div>
			<div className="line-2">
				<div className="quoted-tweet-mention-container">
					<p className="">
						<strong>{numeral(quotedTweetsToUnverifiedCount / quotedTweetsCount).format('0.00%')}</strong>
					</p>
					<p className="short-line">% Quoted Tweets from Unverified User </p>
				</div>
				<div className="total-retweets-container">
					<p className="short-line">
						<strong>{totalTweets}</strong>
					</p>
					<p className="short-line">% Statuses to Unverified User</p>
				</div>
			</div>
		</div>
	);
};

export default TweetStatsContainer;
