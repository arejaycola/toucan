import React from 'react';
import ModalXLarge from '../ModalXLarge';

const Settings = ({showSettings, setShowSettings}) => {
	return (
		<ModalXLarge title={'Best Hour Details'} showChart={showSettings} onHide={() => setShowSettings(false)}>
			Test
		</ModalXLarge>
	);
};
export default Settings;
