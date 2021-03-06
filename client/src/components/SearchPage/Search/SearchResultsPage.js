import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import SearchBox from './SearchBox';
import SearchHistory from '../SearchHistory/SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../../../contexts/SearchContext';
import { TweetContext } from '../../../contexts/TweetContext';
import { LoadingContext } from '../../../contexts/LoadingContext';

import { Col, Row, Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

const SearchResultsPage = (props) => {
	const searchString = props.match.params.text;
	const [hasResults, setHasResults] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const { addSearchHistory } = useContext(SearchContext);
	const { setStatuses, setTweets, setTweetsCount, setRetweets, setRetweetsCount, setQuotedTweets, setQuotedTweetsCount } = useContext(TweetContext);
	const { setIsTweetsLoading, setIsRetweetsLoading, setIsQuotedTweetsLoading } = useContext(LoadingContext);

	/* Reset any old data. */
	useEffect(() => {
		setStatuses([]);
		setTweets([]);
		setTweetsCount(0);
		setRetweets([]);
		setRetweetsCount(0);
		setQuotedTweets([]);
		setQuotedTweetsCount(0);

		setIsTweetsLoading(true);
		setIsRetweetsLoading(true);
		setIsQuotedTweetsLoading(true);
	}, []);

	useEffect(() => {
		addSearchHistory(searchString);

		const sendRequest = async () => {
			const response = await Axios.get(`/api/twitter/search/${searchString}`);
			if (response) {
				/* TODO (07/31/2020 12:12) Why put this in context and not just pass it down as prop?*/
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
					<Col m="10">
						{hasResults ? (
							<SearchResultsList searchResults={searchResults} />
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
