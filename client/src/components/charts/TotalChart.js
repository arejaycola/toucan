import React, { useContext } from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import D3Chart from './D3Chart';
import { LoadingContext } from '../../contexts/LoadingContext';

const TotalChart = ({ verifiedDay, verifiedHour, unverifiedDay, unverifiedHour }) => {
	const { isTweetsLoading, isRetweetsLoading, isQuotedTweetsLoading } = useContext(LoadingContext);

	const dayTickFormat = (d) => {
		return moment().weekday(d).format('dddd');
	};
	const hourTickFormat = (d) => {
		if (d === 12) {
			return '12 pm';
		} else if (d === 0) {
			return '12am';
		}

		return moment().hour(d).format('hh');
	};

	return (
		<Row className="mt-3 text-center justify-content-center">
			<Col>
				<Row>
					<Col>
						<h4>Total Statuses</h4>
					</Col>
				</Row>
				{/* <Row>
					<Col>
						<h6>By Day</h6>
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} />
						) : (
							<D3Chart
								id="d3-total-status-chart-day"
								label="# of Statuses"
								tickFormat={dayTickFormat}
								dataVerified={verifiedDay}
								dataUnverified={unverifiedDay}
							/>
						)}
					</Col>
					<Col>
						<h6>By Hour</h6>
						{isTweetsLoading && isRetweetsLoading && isQuotedTweetsLoading ? (
							<Loader type="Audio" color="#00BFFF" height={50} width={50} />
						) : (
							<D3Chart
								id="d3-total-status-chart-hour"
								label="# of Tweets"
								tickFormat={hourTickFormat}
								dataVerified={verifiedHour}
								dataUnverified={unverifiedHour}
							/>
						)}
					</Col>
				</Row> */}
			</Col>
		</Row>
	);
};

export default TotalChart;
