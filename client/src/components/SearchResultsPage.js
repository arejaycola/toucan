import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import SearchBox from './SearchBox';
import SearchResultsList from './SearchResultList';
import { SearchContext } from '../contexts/SearchContext';

const SearchResultsPage = () => {
	const { searchHistory, searchResults } = useContext(SearchContext);
	const history = useHistory();

	/* Redirect to index if there are no results. */
	searchResults.length != 0 || history.push('/');


	return (
		<div className="">
			<SearchBox />
			<SearchResultsList />
		</div>
	);
};

export default SearchResultsPage;
