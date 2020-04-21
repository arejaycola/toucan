import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import SearchHistoryItem from './SearchHistoryItem';

const SearchHistory = () => {
	const { setSearchHistory, searchHistory } = useContext(SearchContext);

	const clearSearchResultsClick = () => {
		localStorage.removeItem('searchHistory');
		setSearchHistory(null);
	};

	return (
		<Col className="semi-transparent rounded mt-5 text-center p-3">
			<h3 className="header">Search History</h3>

			{searchHistory == null ? (
				<ListGroup.Item variant="light">No search history...</ListGroup.Item>
			) : (
				<ListGroup>
					{Array.from(new Set(searchHistory)).map((item, i) => {
						return <SearchHistoryItem key={i} item={item} />;
					})}
				</ListGroup>
			)}
			<Row className="mt-3">
				<Col>
					<a href='#' onClick={clearSearchResultsClick}>
						<h6>
							<small className="text-primary">Clear Search History</small>
						</h6>
					</a>
				</Col>
			</Row>
		</Col>
	);
};

export default SearchHistory;
