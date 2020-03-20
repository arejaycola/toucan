import React, { useState } from 'react';
import Child from './Child';

import SearchContext from '../context/search-context';

const Parent = () => {
	const [text, setText] = useState('');

	return (
		<SearchContext.Provider value={{ text, setText }}>
			<p>Hello this is a parent {text}</p>

			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />

			<Child />
		</SearchContext.Provider>
	);
};

export default Parent;
