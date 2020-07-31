import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardDeck, Button } from 'react-bootstrap';
import NoResultsFound from '../../NoResultsFound';

const SearchResults = ({ searchResults }) => {
	const history = useHistory();

	const onCardClick = (id, statusCount) => {
		history.push({ pathname: `/user/${id}`, state: { maxStatusCount: statusCount } });
	};

	return (
		<CardDeck>
			{searchResults.length !== 0 ? (
				searchResults.map((result) => {
					return (
						<Card className="custom-card mb-3 mx-auto semi-transparent mt-5" key={result.id_str}>
							<Card.Img className="mx-auto" variant="top" src={`${result.profile_image_url_https.replace('_normal', '')}`} />
							<Card.Body>
								<Card.Title className=" font-weight-bold">{result.name}</Card.Title>
								<Card.Text className="mb-2">
									<strong>Handle: </strong>
									<a target="_blank" rel="noopener noreferrer" href={`https://www.twitter.com/${result.screen_name}`}>
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
										onCardClick(result.id_str, result.statuses_count);
									}}
								>
									View
								</Button>
							</Card.Footer>
						</Card>
					);
				})
			) : (
				<NoResultsFound />
			)}
		</CardDeck>
	);
};

export default SearchResults;
