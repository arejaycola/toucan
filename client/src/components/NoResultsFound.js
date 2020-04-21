import React from 'react';
import { Row, Col } from 'react-bootstrap';

const NoResultsFound = () => {
	return (
		<Row className='mt-5'>
			<Col className="p-5 text-center rounded semi-transparent" xs='10'>
				<h3>No verified users found. Please refine your search and try again.</h3>
			</Col>
		</Row>
	);
};

export default NoResultsFound;
