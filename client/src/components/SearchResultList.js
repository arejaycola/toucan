import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { useHistory } from 'react-router-dom';
import { Col, Card, Row, CardGroup, CardDeck, Button } from 'react-bootstrap';

const SearchResults = () => {
	const { searchResults } = useContext(SearchContext);
	const history = useHistory();

	const onCardClick = (id) => {
		history.push(`/user/${id}`);
	};

	return (
		<CardDeck>
			{searchResults.length != 0
				? searchResults.map((result) => {
						return (
							<Card className="mb-3 shadow" key={result.id} style={{ minWidth: '18rem', maxWidth: '18rem' }}>
								<Card.Img variant="top" src={`${result.profile_image_url_https.replace('_normal', '')}`} />
								<Card.Body>
									<Card.Title className=" font-weight-bold">{result.name}</Card.Title>
									<Card.Text className="mb-2">
										<strong>Handle: </strong>
										<a target="_blank" href={`https://www.twitter.com/${result.screen_name}`}>
											@{result.screen_name}
										</a>
									</Card.Text>
									<Card.Text className="mb-2">
										<strong>Location: </strong>
										{result.location ? result.location : 'Unknown'}
									</Card.Text>
									<Card.Text className="mb-2">
										<strong>Followers: </strong>
										{result.followers_count.toLocaleString()}
									</Card.Text>
									<Card.Text>
										<strong>Description: </strong>
										{result.description ? result.description : 'No description given.'}
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Button
										block
										onClick={() => {
											onCardClick(result.id);
										}}
									>
										View
									</Button>
								</Card.Footer>
							</Card>

							// <div onClick={() => onCardClick(result.id)} className="card hvr-bob" key={result.id}>
							// 	<div className="card-top">
							// 		<div className="card-left-side">
							// 			<img src={`${result.profile_image_url_https.replace('_normal', '')}`} />
							// 		</div>
							// 		<div className="card-right-side">
							// 			<p>
							// 				<strong>Name: </strong> {result.name}
							// 			</p>
							// 			<p>
							// 				<strong>Handle: </strong>
							// 				<a target="_blank" href={`https://www.twitter.com/${result.screen_name}`}>
							// 					@{result.screen_name}
							// 				</a>
							// 			</p>
							// 			<p>
							// 				<strong>Location: </strong>
							// 				{result.location ? result.location : 'Unknown'}
							// 			</p>
							// 			<p>
							// 				<strong>Followers: </strong>
							// 				{result.followers_count.toLocaleString()}
							// 			</p>
							// 		</div>
							// 	</div>
							// 	<div className="card-bottom">
							// 		<p>
							// 			<strong>Description: </strong>
							// 			{result.description ? result.description : 'No description given.'}
							// 		</p>
							// 	</div>
							// </div>
						);
				  })
				: null}
		</CardDeck>
	);

	// return (
	// 	<div className="search-results">
	// 		{searchResults.length != 0
	// 			? searchResults.map((result) => {
	// 					return (
	// 						<div onClick={() => onCardClick(result.id)} className="card hvr-bob" key={result.id}>
	// 							<div className="card-top">
	// 								<div className="card-left-side">
	// 									<img src={`${result.profile_image_url_https.replace('_normal', '')}`} />
	// 								</div>
	// 								<div className="card-right-side">
	// 									<p>
	// 										<strong>Name: </strong> {result.name}
	// 									</p>
	// 									<p>
	// 										<strong>Handle: </strong>
	// 										<a target="_blank" href={`https://www.twitter.com/${result.screen_name}`}>
	// 											@{result.screen_name}
	// 										</a>
	// 									</p>
	// 									<p>
	// 										<strong>Location: </strong>
	// 										{result.location ? result.location : 'Unknown'}
	// 									</p>
	// 									<p>
	// 										<strong>Followers: </strong>
	// 										{result.followers_count.toLocaleString()}
	// 									</p>
	// 								</div>
	// 							</div>
	// 							<div className="card-bottom">
	// 								<p>
	// 									<strong>Description: </strong>
	// 									{result.description ? result.description : 'No description given.'}
	// 								</p>
	// 							</div>
	// 						</div>
	// 					);
	// 			  })
	// 			: null}
	// 	</div>
	// );
};

export default SearchResults;
