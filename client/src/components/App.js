import React, { useState } from 'react';
import HomePage from './HomePage';
import SearchBox from './SearchBox';
import SearchResultList from './SearchResultList';
import Parent from './Parent';
import SearchContext from '../context/search-context';
import AppRouter from '../routers/AppRouter';

const App = () => {
	const [searchResults, setSearchResults] = useState();
	// const [classes, setClasses] = useState();

	// const animateSearchBox = (p) => {
	// 	setClasses(p);
	// };

	// const populateSearchResults = (results) => {
	// 	setSearchResults(results);
	// 	console.log(results);
	// };

	return (
		<SearchContext.Provider value={{ searchResults, setSearchResults }}>
			<AppRouter />
		</SearchContext.Provider>
	);
};

export default App;
