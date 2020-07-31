import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
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
		<SearchContext.Provider value={{ searchHistory, addSearchHistory, setSearchHistory, selectedUser, setSelectedUser }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchContextProvider;
