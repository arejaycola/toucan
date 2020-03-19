import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBox = ({ animateSearchBox, populateSearchResults }) => {
	const [searchText, setSearchChange] = useState('');

	// useEffect(async () => {
	// 	const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: 'rob' });
	// 	if (response) {
	// 		animateSearchBox('top-container');
	// 		populateSearchResults(response.data);
	// 	}
	// }, []);

	const searchButtonClick = async () => {
		try {
			const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: 'rob' });
			if (response) {
				// animateSearchBox('top-container');
				populateSearchResults(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="search-box-container ">
			<h1 className="title">Toucan</h1>
			<h4 className="sub-title">Enter a verified Twitter Account</h4>
			<input onChange={(e) => setSearchChange(e.target.value)} className="text-input" type="text" />
			<button className="button" onClick={searchButtonClick}>
				Search
			</button>
		</div>
	);
};

export default SearchBox;
