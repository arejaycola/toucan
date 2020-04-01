import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
	const [searchResults, setSearchResults] = useState('');
	const [searchHistory, setSearchHistory] = useState([]);

	const addSearchHistory = (newHistory) => {
		setSearchHistory([...searchHistory, newHistory]);
	};

	return (
		<SearchContext.Provider value={{ searchResults, setSearchResults, searchHistory, addSearchHistory }}>{props.children}</SearchContext.Provider>
	);
};

export default SearchContextProvider;
