import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { Col, ListGroup } from 'react-bootstrap';

const SearchHistory = () => {
	// const { searchHistory } = useContext(SearchContext);
	const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

	return (
		<Col className="semi-transparent rounded mt-5 text-center p-3">
			<h3 className="header">Search History</h3>

			{searchHistory.length == 0 ? (
				<ListGroup.Item>No search history...</ListGroup.Item>
			) : (
				<ListGroup>
					{searchHistory.map((item, i) => {
						return (
							<ListGroup.Item key={i} action variant="light" href={`/search/${item}`}>
								{item}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			)}
		</Col>
	);
};

export default SearchHistory;
