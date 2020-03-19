import React from 'react';

const SearchResults = ({ results }) => {
	return results.length > 0 ? (
		<div className="search-list-results">
			<ul>
				{results.map((result) => {
					return (
						<li key={result.id}>
							{result.name} {result.description}
						</li>
					);
				})}
			</ul>
		</div>
	) : null;
};

export default SearchResults;
