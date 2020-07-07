import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';
import { Col, Row, Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

const SearchResultsPage = (props) => {
	const searchString = props.match.params.text;
	const [hasResults, setHasResults] = useState(false);
	const { addSearchHistory } = useContext(SearchContext);

	const { setSearchResults } = useContext(SearchContext);

	useEffect(() => {
		addSearchHistory(searchString);

		const sendRequest = async () => {
			const response = await Axios.get(`/api/twitter/search/${searchString}`);
			if (response) {
				setSearchResults(response.data.sort((a, b) => b.followers_count - a.followers_count));
				setHasResults(true);
			}
		};
		sendRequest();
	},[searchString]);

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
					<Col m="10">
						{hasResults ? (
							<SearchResultsList />
						) : (
							<Col className="mt-5 text-center">
								<Loader type="MutatingDots" color="#00BFFF" secondaryColor="#00BFFF" height={100} width={100} timeout={3000} />
							</Col>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SearchResultsPage;
