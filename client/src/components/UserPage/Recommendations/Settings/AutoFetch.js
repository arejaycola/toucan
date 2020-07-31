import React, { useContext } from 'react';
import { Col, Row, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RecommendationSettingsContext } from '../../../../contexts/RecommendationSettingsContext';

const AutoFetch = () => {
	const { autoFetch, setAutoFetch } = useContext(RecommendationSettingsContext);

	return (
		<Row className="my-3 justify-content-center">
			<Col xs={'auto'} className="text-right px-0 mx-0">
				<h5>Autofetch</h5>
			</Col>
			<Col xs={'auto'} className="ml-0">
				<FormCheck onChange={() => setAutoFetch(!autoFetch)} id="auto-fetch-check" type="switch" custom>
					<FormCheck.Input readOnly id="auto-fetch-check" checked={autoFetch} />
					<FormCheck.Label className="default-checkbox" id="auto-fetch-check" onClick={() => setAutoFetch(!autoFetch)}>
						<FontAwesomeIcon icon={faInfoCircle} />
					</FormCheck.Label>
				</FormCheck>
			</Col>
		</Row>
	);
};
export default AutoFetch;
