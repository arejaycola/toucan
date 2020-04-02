import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const SearchResults = () => {
	const { searchResults } = useContext(SearchContext);

	return (
		<div className="search-results">
			{searchResults.length != 0
				? searchResults.map((result) => {
						return (
							<div className="card" key={result.id}>
								<div className="card-top">
									<div className="card-left-side">
										<img src={`${result.profile_image_url_https.replace('_normal', '')}`} />
									</div>
									<div className="card-right-side">
										<p>
											<strong>Name: </strong> {result.name}
										</p>
										<p>
											<strong>Handle: </strong>
											<a target="_blank" href={`https://www.twitter.com/${result.screen_name}`}>
												@{result.screen_name}
											</a>
										</p>
										<p>
											<strong>Location: </strong>
											{result.location ? result.location : 'Unknown'}
										</p>
										<p>
											<strong>Followers: </strong>
											{result.followers_count.toLocaleString()}
										</p>
									</div>
								</div>
								<div className="card-bottom">
									<p>
										<strong>Description: </strong>
										{result.description ? result.description : 'No description given.'}
									</p>
								</div>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default SearchResults;
