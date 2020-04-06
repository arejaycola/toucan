import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
	const [searchText, setSearchText] = useState('');
	const history = useHistory();

	const searchButtonClick = async (e) => {
		e.preventDefault();
		const text = { searchString: searchText.length == 0 ? 'Rob' : searchText };
		history.push(`/search/${text.searchString}`);
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
