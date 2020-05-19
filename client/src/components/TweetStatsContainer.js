import React, { useContext } from 'react';
import numeral from 'numeral';
import { Row, Image, Col, Container } from 'react-bootstrap';

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

	return (
		<>
			<Row>
				<Col xs={12}>
					<h3 className="pb-0 mb-0">Tweet Trends</h3>
					<h6 className="pt-0 mt-0 text-muted">
						<small>(Last ~1k Tweets)</small>
					</h6>
				</Col>
			</Row>
			<Row>
				<Col sm="6">
					<Row>
						<Col>
							<strong>{numeral(tweetsToUnverifiedCount / tweetsCount).format('0.00%')}</strong>
						</Col>
					</Row>
					<Row>
						<Col>% Tweets with Unverified User Mention</Col>
					</Row>
				</Col>
				<Col sm="6" className="mt-4 mt-sm-0">
					<Row>
						<Col>
							<strong>{numeral(retweetsToUnverifiedCount / retweetsCount).format('0.00%')}</strong>
						</Col>
					</Row>
					<Row>
						<Col>% Retweets of Unverified User</Col>
					</Row>
				</Col>
			</Row>
			<Row className="mt-4 mt-sm-3">
				<Col sm="6">
					<Row>
						<Col>
							<strong>{numeral(quotedTweetsToUnverifiedCount / quotedTweetsCount).format('0.00%')}</strong>
						</Col>
					</Row>
					<Row>
						<Col>% Quoted Tweets from Unverified User</Col>
					</Row>
				</Col>
				<Col sm="6" className="mt-4 mt-sm-0">
					<Row>
						<Col>
							<strong>{totalTweets}</strong>
						</Col>
					</Row>
					<Row>
						<Col>% Statuses to Unverified User</Col>
					</Row>
				</Col>
			</Row>
		</>
		// <div className="tweet-stats-container">
		//
		// 	<div className="line-2">
		// 		<div className="quoted-tweet-mention-container">
		// 			<p className="">
		// 				<strong>{numeral(quotedTweetsToUnverifiedCount / quotedTweetsCount).format('0.00%')}</strong>
		// 			</p>
		// 			<p className="short-line">% Quoted Tweets from Unverified User </p>
		// 		</div>
		// 		<div className="total-retweets-container">
		// 			<p className="short-line">
		// 				<strong>{totalTweets}</strong>
		// 			</p>
		// 			<p className="short-line">% Statuses to Unverified User</p>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default TweetStatsContainer;
