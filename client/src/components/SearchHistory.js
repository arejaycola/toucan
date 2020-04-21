import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { Col, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const SearchHistory = () => {
	const { searchHistory } = useContext(SearchContext);

	new Set(searchHistory)
	return (
		<Col className="semi-transparent rounded mt-5 text-center p-3">
			<h3 className="header">Search History</h3>

			{searchHistory == null ? (
				<ListGroup.Item>No search history...</ListGroup.Item>
			) : (
				<ListGroup>
					{Array.from(new Set(searchHistory)).map((item, i) => {
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
