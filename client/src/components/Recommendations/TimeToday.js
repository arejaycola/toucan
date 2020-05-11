import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Col, Row } from 'react-bootstrap';
import { TweetContext } from '../../contexts/TweetContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Loader from 'react-loader-spinner';

const TimeToday = () => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const {
		globalVerifiedDayCount,
		setGlobalVerifiedDayCount,
		globalVerifiedHourCount,
		setGlobalVerifiedHourCount,
		globalUnverifiedDayCount,
		setGlobalUnverifiedDayCount,
		globalUnverifiedHourCount,
		setGlobalUnverifiedHourCount,
		tweets,
		retweets,
		quotedTweets,
		statuses,
	} = useContext(TweetContext);

	const [todayCount, setTodayCount] = useState(Array(24).fill(0));
	const [bestHour, setBestHour] = useState(0);

	const tempToday = Array(24).fill(0);

	useEffect(() => {
		if (statuses.length > 0) {
			let createdOnThisDay = statuses.filter((status) => {
				return moment(status.created_at).weekday() === moment().weekday();
			});

			createdOnThisDay.map((t) => {
				tempToday[moment(t.created_at).hour()]++;
			});

			setTodayCount(tempToday);

			setBestHour(
				moment()
					.set('hour', tempToday.indexOf(Math.max(...tempToday)))
					.set('minute', 0)
					.format('HH:mm A')
			);
		}
	}, [statuses]);

	/* TODO (04/30/2020 11:54) Somehow factor in response time.*/
	// const { globalUnverifiedHourCount } = useContext(TweetContext);

	const today = moment().weekday();
	// const
	// console.log(statuses.length);

	// const bestHour = moment()
	// 	.set('hour', globalUnverifiedHourCount.indexOf(Math.max(...globalUnverifiedHourCount)))
	// 	.set('minute', 0)
	// 	.format('HH:mm A');

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						Best hour to tweet today:&nbsp;
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader className="d-inline" type="ThreeDots" color="#555555" height={25} width={15} timeout={3000} />
						) : (
							<strong>{bestHour}</strong>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default TimeToday;
