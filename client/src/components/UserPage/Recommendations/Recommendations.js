import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Button, ProgressBar } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import Time from './Time';
import TimeToday from './TimeToday';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { TweetContext } from '../../../contexts/TweetContext';
import { InitialStatusContext } from '../../../contexts/InitialStatusContext';
import { RecommendationSettingsContext } from '../../../contexts/RecommendationSettingsContext';
import Settings from './Settings/Settings';

const Recommendations = ({ maxStatusCount }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const { setInitialRetweets, initialStatuses, setInitialQuotedTweets, setInitialTweets, setInitialStatuses } = useContext(InitialStatusContext);
	const { sliderCount } = useContext(RecommendationSettingsContext);

	const { tweets, retweets, quotedTweets, statuses, masterStatuses, percentLoaded } = useContext(TweetContext);

	const [timeDisabled, setTimeDisabled] = useState(true);
	const [timeTodayDisabled, setTimeTodayDisabled] = useState(true);
	const [dayTimeDisabled, setDayTimeDisabled] = useState(true);

	const [showSettings, setShowSettings] = useState(false);
	const [updateData, setUpdateData] = useState(false);

	useEffect(() => {
		/* When adding new data just add the new stuff to the old stuff */
		setInitialStatuses((oldStatuses) => [...oldStatuses, ...statuses]);
		setInitialTweets((oldTweets) => [...oldTweets, ...tweets]);
		setInitialRetweets((oldRetweets) => [...oldRetweets, ...retweets]);
		setInitialQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...quotedTweets]);
	}, [updateData]);

	/* TODO (08/30/2020 21:25) This is All OBE. Will just show first 1000 with autofetching up to 3200.
			 This would require too many requests. I can't just look at the first n statues and tweets, those won't be the same. 
			Need a way to know what tweets are in the first n statues. 2000 statues != 2000 tweets, there may only be 5 tweets. */
	// useEffect(() => {
	// console.log(`Slider: ${sliderCount} initialStatues: ${initialStatuses.length}`);
	/* Only show the number of statuses indicated by the slider in settings. */
	// const filteredStatuses = masterStatuses.slice(0, sliderCount);

	// parseInitialStatuses(filteredStatuses);

	/* When adding new data just add the new stuff to the old stuff */
	// setInitialStatuses((oldStatuses) => [...oldStatuses, ...statuses]);
	// setInitialTweets((oldTweets) => [...oldTweets, ...tweets]);
	// setInitialRetweets((oldRetweets) => [...oldRetweets, ...retweets]);
	// setInitialQuotedTweets((oldQuotedTweets) => [...oldQuotedTweets, ...quotedTweets]);
	// }, [sliderCount]);

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
					<ProgressBar animated now={percentLoaded} label={`${percentLoaded}%`} />
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
