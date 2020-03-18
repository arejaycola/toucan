import React, { useState } from 'react';
import axios from 'axios';

import '../styles/SearchBox.scss';
import '../styles/inputs.scss';

const SearchBox = () => {
	const [searchText, searchTextUpdate] = useState('');
	// const [suggestions, su]

	const searchBoxChange = async (e) => {
		console.log('tehe');
		searchTextUpdate(e.target.value);

		const response = await axios.post(`http://localhost:5000/api/world`, { test: 'user' });
		console.log(response.data);
	};

	return (
		<div className="search-box-container">
			<h2 className="title">Toucan</h2>
			<p className="sub-title">Enter a verified Twitter Account</p>
			<p>{searchText}</p>
			<input onChange={searchBoxChange} className="text-input" type="text" />
		</div>
	);
};

export default SearchBox;
