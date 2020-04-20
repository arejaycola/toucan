import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';
import { Col, Row, Container } from 'react-bootstrap';

const SearchResultsPage = (props) => {
	const searchString = props.match.params.text;
	const [hasResults, setHasResults] = useState(false);

	const { setSearchResults } = useContext(SearchContext);

	useEffect(() => {
		const sendRequest = async () => {
			const response = await Axios.get(`/api/twitter/search/${searchString}`);
			if (response) {
				setSearchResults(response.data.sort((a, b) => b.followers_count - a.followers_count));
				setHasResults(true);
			}
		};
		sendRequest();
	}, [searchString]);

	return (
		<>
			<Col xs="12" md="8" lg="6" className="semi-transparent mt-3 mt-md-5 bg-light rounded mx-auto py-5 text-center">
				<SearchBox defaultValue={searchString} />
				{/* <p>Click on a user below to view their Twitter habits.</p> */}
			</Col>
			<Container fluid>
				<Row>
					<Col className="d-none d-lg-block" md="2">
						<SearchHistory />
					</Col>
					<Col m="10">{hasResults ? <SearchResultsList /> : 'No Results Found'}</Col>
				</Row>
			</Container>
		</>
	);
};

export default SearchResultsPage;
