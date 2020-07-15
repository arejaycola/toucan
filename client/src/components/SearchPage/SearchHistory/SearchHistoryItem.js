import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SearchHistoryItem = ({ id, item }) => {
	return (
		<ListGroup.Item action variant="light" href={`/search/${item}`}>
			{item}
		</ListGroup.Item>
	);
};

export default SearchHistoryItem;
