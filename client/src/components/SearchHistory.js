import React, { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';

const SearchHistory = () => {
	const { searchHistory } = useContext(SearchContext);

	return searchHistory.length > 0 ? (
		searchHistory.map((item, i) => {
			return <p key={i}>{item}</p>;
		})
	) : (
		<p>No recent searches</p>
	);
};

export default SearchHistory;
