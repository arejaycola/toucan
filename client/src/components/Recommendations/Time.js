import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { StatusContext } from '../../contexts/StatusContext';
import { UserTypeContext } from '../../contexts/UserTypeContext';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';
import D3Chart from '../helpers/D3Chart';
import ModalXLarge from '../ModalXLarge';
import Filters from './Filters';
import useToggleUserType from '../../hooks/useToggleUserType';
import useToggleStatus from '../../hooks/useToggleStatus';

const Time = ({ onViewClick, viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const { statuses, retweets, quotedTweets, tweets } = useContext(TweetContext);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const [statusesTime, setStatusesTime] = useState(Array(24).fill(0));
	const [retweetsTime, setRetweetsTime] = useState(Array(24).fill(0));
	const [quotedTweetsTime, setQuotedTweetsTime] = useState(Array(24).fill(0));
	const [tweetsTime, setTweetsTime] = useState(Array(24).fill(0));

	const [bestHours, setBestHours] = useState([]);
	const [showChart, setShowChart] = useState(false);

	const { showBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeContext);
	const { showAllStatuses, showRetweets, showQuotedTweets, showTweets } = useContext(StatusContext);

	// /* State related to chart filtering */
	// const [showAllStatuses, setShowAllStatuses] = useState(true);
	// const [showTweets, setShowTweets] = useState(false);
	// const [showRetweets, setShowRetweets] = useState(false);
	// const [showQuotedTweets, setShowQuotedTweets] = useState(false);

	// const [showBothUserTypes, setShowBothUserTypes] = useState(true);
	// const [showVerifiedUsers, setShowVerifiedUsers] = useState(false);
	// const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(false);

	const { toggleUserType } = useToggleUserType();
	const { toggleStatus } = useToggleStatus();

	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
			return '12am';
		}

		return moment().hour(d).format('h');
	};

	const onToggleViewClick = () => {
		setShowChart(!showChart);
	};

	useEffect(() => {
		if (statuses.length > 0) {
			const tempHours = Array(24).fill(0);
			const tempHoursFiltered = Array(24).fill(0);

			/* TODO (07/08/2020 11:16) Figure out how to show all statuses with verified filter */
			statuses
				// .filter((status) => {
				// 	return (showVerifiedUsers && status.userType === 'verified') || (showUnverifiedUsers && status.userType === 'unverified');
				// })
				.map((status) => {
					tempHours[moment(status.created_at).hour()]++;
					return status;
				});

			/* Count the hour of every status */
			for (let i = 0; i < statuses.length; i++) {}

			/* Find the maximum in a day */
			const maxHour = Math.max(...tempHours);

			/* Set the best hours for the label */
			setBestHours(
				tempHours.reduce((a, e, i) => {
					if (e === maxHour) {
						a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
					}
					return a;
				}, [])
			);

			setStatusesTime(tempHours);
		}
	}, [statuses, showVerifiedUsers, showUnverifiedUsers]);

	/* TODO (07/08/2020 11:07) Move these to hooks?*/
	useEffect(() => {
		const tempHours = Array(24).fill(0);

		retweets
			.filter((retweet) => {
				return (showVerifiedUsers && retweet.userType === 'verified') || (showUnverifiedUsers && retweet.userType === 'unverified');
			})
			.map((retweet) => {
				tempHours[moment(retweet.created_at).hour()]++;
				return retweet;
			});

		setRetweetsTime(tempHours);
	}, [retweets, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		const tempHours = Array(24).fill(0);

		quotedTweets
			.filter((quotedTweet) => {
				return (showVerifiedUsers && quotedTweet.userType === 'verified') || (showUnverifiedUsers && quotedTweet.userType === 'unverified');
			})
			.map((quotedTweet) => {
				tempHours[moment(quotedTweet.created_at).hour()]++;
				return quotedTweet;
			});
		setQuotedTweetsTime(tempHours);
	}, [quotedTweets, showVerifiedUsers, showUnverifiedUsers]);

	useEffect(() => {
		const tempHours = Array(24).fill(0);

		tweets
			.filter((tweet) => {
				return (showVerifiedUsers && tweet.userType === 'verified') || (showUnverifiedUsers && tweet.userType === 'unverified');
			})
			.map((tweet) => {
				tempHours[moment(tweet.created_at).hour()]++;
				return tweet;
			});
		setTweetsTime(tempHours);
	}, [tweets, showVerifiedUsers, showUnverifiedUsers]);

	return (
		<Row className="mx-0">
			<Col>
				<Row>
					<Col>
						{bestHours.length === 0 ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={15000} />
						) : (
							<strong>
								{bestHours.map((hour, i) => {
									return i !== bestHours.length - 1 ? <span key={i}>{hour}, </span> : <span key={i}>{hour}</span>;
								})}
							</strong>
						)}
					</Col>
				</Row>
				<Row>
					<Col>Best hour to tweet (on average)</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<Button id="time-today" onClick={onToggleViewClick} disabled={viewDisabled}>
							{showChart ? 'Hide' : 'View'}
						</Button>

						{showChart ? (
							<ModalXLarge title={'Best Hour Details'} showChart={showChart} onHide={() => setShowChart(false)}>
								<Row>
									<Col className="text-center p-0 mx-0 ">
										<h6>Best Hour</h6>
										<D3Chart
											id="d3-hour-chart"
											label="# of Statuses"
											tickFormat={hourTickFormat}
											showAllStatuses={showAllStatuses}
											showReweets={showRetweets}
											data={[
												{ show: showAllStatuses, type: 'all', datum: statusesTime },
												{ show: showRetweets, type: 'retweets', datum: retweetsTime },
												{ show: showTweets, type: 'tweets', datum: tweetsTime },
												{ show: showQuotedTweets, type: 'quoted', datum: quotedTweetsTime },
											]}
										/>
									</Col>
								</Row>
								<Filters
									showAllStatuses={showAllStatuses}
									showTweets={showTweets}
									showRetweets={showRetweets}
									showQuotedTweets={showQuotedTweets}
									showBothUserTypes={showBothUserTypes}
									showVerifiedUsers={showVerifiedUsers}
									showUnverifiedUsers={showUnverifiedUsers}
									toggleStatus={toggleStatus}
									toggleUserType={toggleUserType}
								/>
							</ModalXLarge>
						) : null}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Time;
