import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';

const SearchResultsPage = () => {
	const { searchResults } = useContext(SearchContext);
	const history = useHistory();

	/* Redirect to index if there are no results. */
	searchResults.length != 0 || history.push('/');

	return (
		<div className="search-page-container">
			<div className="left-side">
				<div className="search-box">
					<SearchBox />
				</div>
				<SearchHistory />
			</div>
			<div className="right-side">
				<SearchResultsList />
			</div>
		</div>
	);
};

export default SearchResultsPage;
