import React from 'react';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Legend = () => {
	return (
		<div className="legend-container">
			<div className="legend">
				<p>
					<FontAwesomeIcon className="unverified" icon={faSquareFull} />
					<br />
					Unverified
				</p>
				<p>
					<FontAwesomeIcon className="verified" icon={faSquareFull} />
					<br />
					Verified
				</p>
			</div>
		</div>
	);
};

export default Legend;
