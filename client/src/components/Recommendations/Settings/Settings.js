import React from 'react';
import ModalXLarge from '../../ModalXLarge';
import { Col, Row, FormCheck } from 'react-bootstrap';
import TimeTable from './TimeTable';

const Settings = ({ showSettings, setShowSettings }) => {
	return (
		<ModalXLarge title={'Recommendation Settings'} showChart={showSettings} onHide={() => setShowSettings(false)}>
			<Row className="justify-content-center">
				<Col xs={'auto'} className="text-right px-0 mx-0">
					<h5>Time</h5>
				</Col>
				<Col xs={'auto'} className="ml-0">
					<FormCheck id="show-all-status" type="switch" custom>
						<FormCheck.Label id="show-all-status">
							<FormCheck.Input readOnly id="show-all-status" />
						</FormCheck.Label>
					</FormCheck>
				</Col>
			</Row>
			<Row>
				<Col>
					<TimeTable />
				</Col>
			</Row>
		</ModalXLarge>
	);
};
export default Settings;
