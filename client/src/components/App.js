import React, { useState } from 'react';
import HomePage from './HomePage';
import SearchBox from './SearchBox';
import SearchResultList from './SearchResultList';
import Parent from './Parent';
import SearchContext from '../context/search-context';

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
		<div className="App">
			<SearchContext.Provider value={{ searchResults, setSearchResults }}>
				<HomePage />
			</SearchContext.Provider>
			{/* <SearchBox populateSearchResults={populateSearchResults} animateSearchBox={animateSearchBox} /> */}

			{/* <SearchResultList results={searchResults} /> */}
		</div>
	);
};

export default App;
