import React, { useContext } from 'react';
import numeral from 'numeral';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';

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
		<Col className="mx-auto px-md-0  mt-4 mt-md-0" xs="7" sm="5" md="4">
			<Row>
				<Col className="text-center">
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
				</Col>
			</Row>
		</Col>
	);
};

export default TweetStatsContainer;
