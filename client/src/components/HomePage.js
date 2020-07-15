import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import SearchBox from './SearchPage/Search/SearchBox';

const HomePage = () => {

	return (
		<>
			<Container>
				<Row>
					<Col xs="12" md="12" className="semi-transparent mt-5 bg-light rounded py-5 px-3 px-md-5 text-center">
						<h3 className="mb-4 mb-md-3">
							Welcome to Toucan! The site that analyzes tweets, trends, and other statistics to determine the likelihood of soliciting a
							response from Twitter Celebrities.
						</h3>
						<h4 className="font-weight-light">To get started, search for a verified Twitter account and select from the options.</h4>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col xs="12" md="8" lg="6" className="semi-transparent mb-5 mt-3 mt-md-5 bg-light rounded mx-auto py-5 text-center">
						<SearchBox />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
