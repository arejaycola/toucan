import React, { useContext } from 'react';
import numeral from 'numeral';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { TweetContext } from '../contexts/TweetContext';
import { LoadingContext } from '../contexts/LoadingContext';

const TweetStatsContainer = (props) => {
	const {
		tweetsCount,
		tweetsToUnverifiedCount,
		retweetsCount,
		retweetsToUnverifiedCount,
		quotedTweetsCount,
		quotedTweetsToUnverifiedCount,
	} = useContext(TweetContext);

	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);


	const totalTweets = numeral(
		(tweetsToUnverifiedCount + retweetsToUnverifiedCount + quotedTweetsToUnverifiedCount) / (tweetsCount + retweetsCount + quotedTweetsCount)
	).format('0.00%');

	return (
		<>
			<Row>
				<Col xs={12}>
					<h3 className="pb-0 mb-0">Tweet Trends</h3>
					<h6 className="pt-0 mt-0 text-muted">
						<small>(Last ~1k Statuses)</small>
					</h6>
				</Col>
			</Row>
			<Row>
				<Col sm="6">
					<Row>
						<Col>
							{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
								<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
							) : (
								<strong>{numeral(tweetsToUnverifiedCount / tweetsCount).format('0.00%')}</strong>
							)}
						</Col>
					</Row>
					<Row>
						<Col>% Tweets with Unverified User Mention</Col>
					</Row>
				</Col>
				<Col sm="6" className="mt-4 mt-sm-0">
					<Row>
						<Col>
							{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
								<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
							) : (
								<strong>{numeral(retweetsToUnverifiedCount / retweetsCount).format('0.00%')}</strong>
							)}
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
							{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
								<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
							) : (
								<strong>{numeral(quotedTweetsToUnverifiedCount / quotedTweetsCount).format('0.00%')}</strong>
							)}
						</Col>
					</Row>
					<Row>
						<Col>% Quoted Tweets from Unverified User</Col>
					</Row>
				</Col>
				<Col sm="6" className="mt-4 mt-sm-0">
					<Row>
						<Col>
							{isTweetsLoading || isRetweetsLoading || isQuotedTweetsLoading ? (
								<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={30000} />
							) : (
								<strong>{totalTweets}</strong>
							)}
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
