import React from 'react';
import SearchBox from './SearchBox';
import SearchResultsList from './SearchResultList';

const HomePage = () => {
	return (
		<div>
			<SearchBox />
			<SearchResultsList />
		</div>
	);
};

export default HomePage;
