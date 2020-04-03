import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SearchContext } from '../contexts/SearchContext';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
	const [searchText, setSearchText] = useState('');
	const { addSearchHistory, setSearchResults } = useContext(SearchContext);
	const history = useHistory();

	const searchButtonClick = async (e) => {
		try {
			let serverLocation = process.env.NODE_ENV === 'production' ? 'https://arejaycola-toucan.herokuapp.com' : 'http://localhost:5000';
			console.log(process.env, serverLocation);
			e.preventDefault();
			const response = await axios.post(`/twitter/search`, { searchString: searchText.length == 0 ? 'Rob' : searchText });
			if (response) {
				addSearchHistory(searchText.length == 0 ? 'Rob' : searchText);
				setSearchResults(response.data.sort((a, b) => b.followers_count - a.followers_count));
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
			<button className="button">Search</button>
		</form>
	);
};

export default SearchBox;
