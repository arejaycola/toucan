import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Button } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import Loader from 'react-loader-spinner';
import { LoadingContext } from '../../contexts/LoadingContext';
import D3Chart from '../helpers/D3Chart';
import ModalXLarge from '../ModalXLarge';
import Filters from './Filters';

const Time = ({ onViewClick, viewDisabled }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const {
		globalUnverifiedHourCount,
		globalVerifiedHourCount,
		verifiedRetweetsTime,
		verifiedTweetsTime,
		verifiedQuotedTime,
	} = useContext(TweetContext);
	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	const [bestHours, setBestHours] = useState([]);
	const [hoursForGraphing, setHoursForGraphing] = useState(Array(24).fill(0));
	const [showChart, setShowChart] = useState(false);

	/* State related to chart filtering */
	const [showAllStatuses, setShowAllStatuses] = useState(true);
	const [showTweets, setShowTweets] = useState(false);
	const [showRetweets, setShowRetweets] = useState(false);
	const [showQuotedTweets, setShowQuotedTweets] = useState(false);

	const [showBothUserTypes, setShowBothUserTypes] = useState(true);
	const [showVerifiedUsers, setShowVerifiedUsers] = useState(false);
	const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(false);

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

	const toggleStatus = (e) => {
		if (e.target.id === 'show-all-status') {
			setShowAllStatuses(!showAllStatuses);
		} else if (e.target.id === 'show-tweets') {
			setShowTweets(!showTweets);
		} else if (e.target.id === 'show-retweets') {
			setShowRetweets(!showRetweets);
		} else if (e.target.id === 'show-quoted-tweets') {
			setShowQuotedTweets(!showQuotedTweets);
		}
	};

	const toggleUserType = (e) => {
		if (e.target.id === 'show-both-users') {
			setShowBothUserTypes(!showBothUserTypes);
		} else if (e.target.id === 'show-verified') {
			setShowVerifiedUsers(!showVerifiedUsers);
		} else if (e.target.id === 'show-unverified') {
			setShowUnverifiedUsers(!showUnverifiedUsers);
		}
	};

	useEffect(() => {
		if (!isTweetsLoading && !isRetweetsLoading && !isQuotedTweetsLoading) {
			const tempArray = Array(24).fill(0);
			for (let i = 0; i < globalVerifiedHourCount.length; i++) {
				tempArray[i] = globalVerifiedHourCount[i] + globalUnverifiedHourCount[i];
			}

			setHoursForGraphing(tempArray);
			const maxHour = Math.max(...tempArray);

			const tempBestHours = tempArray.reduce((a, e, i) => {
				if (e === maxHour) {
					a.push(moment().set('hour', i).set('minute', 0).format('h:mm A'));
				}
				return a;
			}, []);

			setBestHours(tempBestHours);
		}
	}, [globalUnverifiedHourCount, globalVerifiedHourCount]);

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
												{ show: showAllStatuses, type: 'all', datum: hoursForGraphing },
												{ show: showRetweets, type: 'retweets', datum: verifiedRetweetsTime },
												{ show: showTweets, type: 'tweets', datum: verifiedTweetsTime },
												{ show: showQuotedTweets, type: 'quoted', datum: verifiedQuotedTime },
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
