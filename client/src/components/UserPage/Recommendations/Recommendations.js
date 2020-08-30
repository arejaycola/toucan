import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import Time from './Time';
import TimeToday from './TimeToday';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { TweetContext } from '../../../contexts/TweetContext';
import { InitialStatusContext } from '../../../contexts/InitialStatusContext';
import Settings from './Settings/Settings';

const Recommendations = ({ maxStatusCount }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const { setInitialRetweets, setInitialQuotedTweets, setInitialTweets, setInitialStatuses } = useContext(InitialStatusContext);

	const { tweets, retweets, quotedTweets, statuses } = useContext(TweetContext);

	const [timeDisabled, setTimeDisabled] = useState(true);
	const [timeTodayDisabled, setTimeTodayDisabled] = useState(true);
	const [dayTimeDisabled, setDayTimeDisabled] = useState(true);

	const [showSettings, setShowSettings] = useState(false);
	const [updateData, setUpdateData] = useState(false);

	useEffect(() => {
		setInitialStatuses((oldStatuses) => [...oldStatuses, ...statuses]);
		setInitialTweets((oldTweets) => [...oldTweets, ...tweets]);
		setInitialRetweets((oldRetweets) => [...oldRetweets, ...retweets]);
		setInitialQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...quotedTweets]);
	}, [updateData]);

	useEffect(() => {
		/* Once everything is done loading, enable the view button. */
		if (!isTweetsLoading && !isRetweetsLoading && !isQuotedTweetsLoading) {
			setTimeDisabled(false);
			setTimeTodayDisabled(false);
			setDayTimeDisabled(false);
		}
	}, [isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading]);

	return (
		<>
			<Row className="mb-4">
				<Col className="text-center">
					<h3>
						Recommendations
						<Button
							onClick={() => setShowSettings(true)}
							className="ml-1 mb-1 p-0"
							size="lg"
							variant="link"
							title="Adjust recommendation engine"
						>
							<FontAwesomeIcon icon={faCog} />
						</Button>
						<Button onClick={() => setUpdateData(true)}>Refresh Data</Button>
					</h3>
				</Col>
			</Row>
			<Row className="text-center mx-0">
				<Col className="mb-3" sm={4}>
					<DayAndTime viewDisabled={dayTimeDisabled} />
				</Col>
				<Col className="mb-3" sm={4}>
					<TimeToday viewDisabled={timeTodayDisabled} />
				</Col>
				<Col className="mb-3" sm={4}>
					<Time viewDisabled={timeDisabled} />
				</Col>
			</Row>
			<Settings showSettings={showSettings} setShowSettings={setShowSettings} maxStatusCount={maxStatusCount} />
		</>
	);
};

export default Recommendations;
