import React from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';


const UserPage = (props) => {

    const history = useHistory();
	const userId = props.match.params.id;

	/* Reroute the user to index if there is no ID. */
	userId || history.push('/');

	return <p>Test {props.match.params.id}</p>;
};

export default UserPage;
