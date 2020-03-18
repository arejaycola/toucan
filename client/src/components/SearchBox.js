import React, { useState } from 'react';
import axios from 'axios';

import '../styles/SearchBox.scss';

const SearchBox = () => {
	const [searchText, searchTextUpdate] = useState('');
	// const [suggestions, su]

	const searchBoxChange = (e) => {
		searchTextUpdate(e.target.value);
	};

	const searchButtonClick = async () => {
		console.log(searchText);

		try {
			const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: searchText });

			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="search-box-container">
			<h1 className="title">Toucan</h1>
			<h4 className="sub-title">Enter a verified Twitter Account</h4>
			<input onChange={searchBoxChange} className="text-input" type="text" />
			<button className="button" onClick={searchButtonClick}>
				Search
			</button>
		</div>
	);
};

export default SearchBox;
