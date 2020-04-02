import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
	const [searchResults, setSearchResults] = useState('');
	const [searchHistory, setSearchHistory] = useState([]);

	const addSearchHistory = (newHistory) => {
		let tempArray = [...searchHistory, newHistory];

		console.log(searchHistory);
		// setSearchHistory([...searchHistory, newHistory]);
		setSearchHistory((items) => [...items, newHistory]);
		console.log(searchHistory);
	};

	return (
		<SearchContext.Provider value={{ searchResults, setSearchResults, searchHistory, addSearchHistory }}>{props.children}</SearchContext.Provider>
	);
};

export default SearchContextProvider;
