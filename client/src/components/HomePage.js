import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import SearchBox from './SearchBox';
import SearchHistory from './SearchHistory';
import SearchResultList from './SearchResultList';
import SearchContext from '../contexts/SearchContext';

const HomePage = () => {
	// const [searchText, setSearchText] = useState('');
	// const { setSearchResults } = useContext(SearchContext);
	const history = useHistory();

	return (
		<div className="home-page-container">
			<div className="welcome-message">
				<p>
					Welcome to Toucan! The site that analyzes tweets, trends, and other statistics to determine the likelihood of soliciting a
					response.
				</p>
				<p>To get started, search for a verified Twitter account and select from the options.</p>
			</div>
			<div className="search-box-container">
				<SearchBox />
			</div>
		</div>
	);
};

export default HomePage;
