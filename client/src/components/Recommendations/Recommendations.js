import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import DayAndTime from './DayAndTime';
import Time from './Time';
import TimeToday from './TimeToday';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ChartContext } from '../../contexts/ChartContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { TweetContext } from '../../contexts/TweetContext';

const Recommendations = () => {
	// const { showTimeTodayChart, setShowTimeTodayChart } = useContext(ChartContext);
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);
	const { statuses } = useContext(TweetContext);

	const [timeDisabled, setTimeDisabled] = useState(true);
	const [timeTodayDisabled, setTimeTodayDisabled] = useState(true);
	const [dayTimeDisabled, setDayTimeDisabled] = useState(true);

	useEffect(() => {
		/* Once everything is done loading, enable the view button. */
		if (!isTweetsLoading && !isRetweetsLoading && !isQuotedTweetsLoading) {
			setTimeDisabled(false);
		}
	}, [isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading]);

	useEffect(() => {
		if (statuses.length > 0) {
			setTimeTodayDisabled(false);
			setDayTimeDisabled(false);
		}
	}, [statuses]);

	const onSettingsClick = () => {
		console.log('tehe');
	};

	return (
		<>
			<Row className="mb-4">
				<Col className="text-center">
					<h3>
						Recommendations
						<Button onClick={onSettingsClick} className="m-1 p-0" size="lg" variant="link" title="Adjust recommendation engine">
							<FontAwesomeIcon icon={faCog} />
						</Button>
					</h3>
				</Col>
			</Row>
			<Row className="text-center">
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
		</>
	);
};

export default Recommendations;
