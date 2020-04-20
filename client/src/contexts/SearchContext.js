import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
	const [searchResults, setSearchResults] = useState('');
	const [searchHistory, setSearchHistory] = useState([]);
	const [selectedUser, setSelectedUser] = useState([]);

	const addSearchHistory = (newHistory) => {
		let previousHistory = localStorage.getItem('searchHistory') !== 'null' ? JSON.parse(localStorage.getItem('searchHistory')) : [];

		localStorage.setItem('searchHistory', JSON.stringify([newHistory, ...previousHistory]));

		// setSearchHistory((items) => [...items, newHistory]);
	};

	return (
		<SearchContext.Provider value={{ searchResults, setSearchResults, searchHistory, addSearchHistory, selectedUser, setSelectedUser }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchContextProvider;
