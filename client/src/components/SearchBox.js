import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import history from '../history/browserHistory';
import { SearchContext } from '../contexts/SearchContext';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
	// const { setSearchResults, searchHistory, setSearchHistory } = useContext(SearchContext);
	const [searchText, setSearchText] = useState('');
	const { addSearchHistory, setSearchResults } = useContext(SearchContext);
	const history = useHistory();

	const searchButtonClick = async (e) => {
		try {
			e.preventDefault();
			const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: searchText.length == 0 ? 'Rob' : searchText });
			if (response) {
				addSearchHistory(searchText);
				setSearchResults(response.data);
				history.push('/search-results');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form className="search-box-form " onSubmit={searchButtonClick}>
			<h1 className="title">Toucan</h1>
			<h4 className="sub-title">Enter a verified Twitter Account</h4>
			<input onChange={(e) => setSearchText(e.target.value)} className="text-input" type="text" />
			{/* <input onChange={(e) => setSearchText(e.target.value)} className="text-input" type="text" /> */}
			<button className="button">Search</button>
		</form>
	);
};

export default SearchBox;
