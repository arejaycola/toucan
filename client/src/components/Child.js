import React, { useContext } from 'react';
import SearchContext from '../context/search-context';

const Child = () => {
	const { text, setText } = useContext(SearchContext);

	return (
		<div>
			<p>And I am the child. This text is from my parent...{text}</p>
			<p>
				Child's input.
				<input value={text} type="text" onChange={(e) => setText(e.target.value)} />
			</p>
		</div>
	);
};

export default Child;
