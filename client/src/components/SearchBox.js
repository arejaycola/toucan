import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchContext from '../context/search-context';

const SearchBox = () => {
	const { setSearchResults } = useContext(SearchContext);
	const [searchText, setSearchChange] = useState('');

	const searchButtonClick = async (e) => {
		try {
			e.preventDefault();
			const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: 'rob' });
			// const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: searchChange});
			if (response) {
				setSearchResults(response.data);
				// animateSearchBox('top-container');
				// populateSearchResults(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form className="search-box-container " onSubmit={searchButtonClick}>
			<h1 className="title">Toucan</h1>
			<h4 className="sub-title">Enter a verified Twitter Account</h4>
			<input onChange={(e) => setSearchChange(e.target.value)} className="text-input" type="text" />
			<button className="button">Search</button>
		</form>
	);
};

export default SearchBox;
