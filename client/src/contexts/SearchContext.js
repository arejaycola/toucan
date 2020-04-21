import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
	const [searchResults, setSearchResults] = useState('');
	const [searchHistory, setSearchHistory] = useState(
		localStorage.getItem('searchHistory') !== 'null' ? JSON.parse(localStorage.getItem('searchHistory')) : []
	);
	const [selectedUser, setSelectedUser] = useState([]);

	const addSearchHistory = (newHistory) => {
		let history = localStorage.getItem('searchHistory') != null ? JSON.parse(localStorage.getItem('searchHistory')) : [];

		/* Remove any duplicates */
		history = [newHistory, ...history];
		history = Array.from(new Set(history));

		if (history.length > 10) {
			history.pop();
		}

		localStorage.setItem('searchHistory', JSON.stringify([newHistory, ...history]));
		setSearchHistory(history);
	};

	return (
		<SearchContext.Provider value={{ searchResults, setSearchResults, searchHistory, addSearchHistory, selectedUser, setSelectedUser }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchContextProvider;
