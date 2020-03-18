import React from 'react';
import SearchBox from './SearchBox';
import '../styles/App.scss';

console.log(process.env.REACT_APP_CONSUMER_KEY);
const App = () => (
	<div className="App">
		<SearchBox />
	</div>
);

export default App;
