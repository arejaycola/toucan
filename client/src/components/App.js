import React, { useState } from 'react';
import SearchBox from './SearchBox';
import SearchResultList from './SearchResultList';

const App = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [classes, setClasses] = useState();

	const animateSearchBox = (p) => {
		setClasses(p);
	};

	const populateSearchResults = (results) => {
		setSearchResults(results);
		console.log(results);
	};

	return (
		<div className="App">
			<SearchBox populateSearchResults={populateSearchResults} animateSearchBox={animateSearchBox} />

			<SearchResultList results={searchResults} />
		</div>
	);
};

export default App;
