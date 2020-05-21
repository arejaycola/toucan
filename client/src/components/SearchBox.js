import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { SearchContext } from '../contexts/SearchContext';

const SearchBox = ({ defaultValue }) => {
	const [searchText, setSearchText] = useState(defaultValue ? defaultValue : '');

	const { addSearchHistory } = useContext(SearchContext);

	const history = useHistory();

	const searchButtonClick = async (e) => {
		e.preventDefault();
		const text = { searchString: searchText.length === 0 ? 'Rob' : searchText };
		addSearchHistory(text.searchString);
		history.push(`/search/${text.searchString}`);
	};

	return (
		<Col md="12">
			<Form onSubmit={searchButtonClick}>
				<Row>
					<Col>
						<h1 className="">Toucan</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<h5 className="font-weight-light">Enter a verified Twitter Account</h5>
					</Col>
				</Row>
				<Row>
					<Col className="mx-auto" md="8">
						<Form.Control type="text" defaultValue={defaultValue} onChange={(e) => setSearchText(e.target.value)} />
					</Col>
				</Row>
				<Row className="mt-2">
					<Col className="mx-auto" xs="12" md="4">
						<Button type="submit" block className="button">
							Search
						</Button>
					</Col>
				</Row>
			</Form>
		</Col>
	);
};

export default SearchBox;
