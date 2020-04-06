import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';

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
		<div className="search-page-container">
			<div className="left-side">
				<div className="search-box">
					<SearchBox />
				</div>
				<SearchHistory />
			</div>
			<div className="right-side">
				<div className="instructions">
					<p>Click on a user below to view their Twitter habits.</p>
				</div>
				<SearchResultsList />
			</div>
		</div>
	);
};

export default SearchResultsPage;
