import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, Button, Form, Col, Row } from 'react-bootstrap';

const SearchBox = () => {
	const [searchText, setSearchText] = useState('');
	const history = useHistory();

	const searchButtonClick = async (e) => {
		e.preventDefault();
		const text = { searchString: searchText.length == 0 ? 'Rob' : searchText };
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
						<Form.Control type="text" onChange={(e) => setSearchText(e.target.value)} />
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
