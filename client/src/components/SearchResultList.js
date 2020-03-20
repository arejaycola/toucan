import React, { useContext } from 'react';
import SearchContext from '../context/search-context';

const SearchResults = () => {
	const  { searchResults } = useContext(SearchContext);

	return searchResults ? (
		<div className="search-list-results">
			<ul>
				{searchResults.map((result) => {
					return (
						<li key={result.id}>
							<img src={`${result.profile_image_url_https.replace('normal', 'bigger')}`} /> {result.name} {result.screen_name}{' '}
							{result.description} {result.location}
						</li>
					);
				})}
			</ul>
		</div>
	) : null;
};

export default SearchResults;
