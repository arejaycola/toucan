import React from 'react';
import ModalXLarge from '../../../ModalXLarge';
import TimeSettings from './TimeSettings/TimeSettings';
import StatusCountSettings from './StatusSettings/StatusCountSettings';

const Settings = ({ showSettings, setShowSettings }) => {
	return (
		<ModalXLarge title={'Recommendation Settings'} showChart={showSettings} onHide={() => setShowSettings(false)}>
			<TimeSettings />
			<StatusCountSettings />
		</ModalXLarge>
	);
};
export default Settings;
