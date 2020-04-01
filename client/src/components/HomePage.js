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


	// const searchButtonClick = async (e) => {
	// 	try {
	// 		e.preventDefault();
	// 		const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: searchText });
	// 		// const response = await axios.post(`http://localhost:5000/twitter/search`, { searchString: setSearchText});
	// 		if (response) {
	// 			history.push('/search-results');
	// 			setSearchResults(response.data);
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	// const setText = (e) => {
	// 	setSearchText(e.target.value);
	// };

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
				<SearchBox/>
			</div>
			{/* <div className="search-box-container">
				<SearchBox />
			</div> */}
			{/* <div className="content">
				<div className="search-history-container">
					<h4 className="title">Recent Searches</h4>
					<SearchHistory />
				</div>
				<div className="search-results-list">
					<SearchResultList />
				</div>
			</div> */}
		</div>
	);
};

export default HomePage;
