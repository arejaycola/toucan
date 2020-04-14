import React, { useContext, useState } from 'react';

import SearchBox from './SearchBox';

const HomePage = () => {
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
