import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const SearchResults = () => {
	const { searchResults } = useContext(SearchContext);

	return (
		<div className="search-results">
			{searchResults.map((result) => {
				return (
					<div className="card" key={result.id}>
						<img src={`${result.profile_image_url_https.replace('_normal', '')}`} /> {result.name} {result.screen_name}{' '}
						{result.description} {result.location}
					</div>
				);
			})}
		</div>
	);
};

export default SearchResults;
