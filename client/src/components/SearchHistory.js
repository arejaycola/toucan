import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const SearchHistory = () => {
	const { searchHistory } = useContext(SearchContext);

	return (
		<div className='search-history-container'>
			<h2 className='header'>Search History</h2>
			{searchHistory.map((item, i) => {
				return <p key={i}>{item}</p>;
			})}
		</div>
	);
};

export default SearchHistory;
