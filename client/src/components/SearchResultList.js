import React from 'react';

const SearchResults = ({results}) => {
	return (
		<ul>

			{results.map((result) => {
				return <li key={result.id}>{result.name}</li>;
			})}
		</ul>
	);
};

export default SearchResults;
