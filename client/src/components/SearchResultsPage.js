import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';
import { Col, Row, Container } from 'react-bootstrap';

const SearchResultsPage = (props) => {
	const searchString = props.match.params.text;
	const { addSearchHistory, setSearchResults } = useContext(SearchContext);

	const history = useHistory();

	useEffect(() => {
		const sendRequest = async () => {
			const response = await Axios.get(`/api/twitter/search/${searchString}`);
			if (response) {
				addSearchHistory(searchString);
				setSearchResults(response.data.sort((a, b) => b.followers_count - a.followers_count));
			}
		};
		sendRequest();
	}, [searchString]);

	return (
		<>
			<Col xs="12" md="8" lg="6" className="semi-transparent mb-5 mt-3 mt-md-5 bg-light rounded mx-auto py-5 text-center">
				<SearchBox />
			{/* <p>Click on a user below to view their Twitter habits.</p> */}
			</Col>
			<Container fluid>
				<Row>
					<Col md="3">
						<SearchHistory />
					</Col>
					<Col md="9">
						<SearchResultsList />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SearchResultsPage;
