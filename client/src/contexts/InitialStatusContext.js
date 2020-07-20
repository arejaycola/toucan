import React, { createContext, useState } from 'react';

export const InitialStatusContext = createContext();

const InitialStatusContextProvider = (props) => {
	const [initialStatuses, setInitialStatuses] = useState([]);
	const [initialTweets, setInitialTweets] = useState([]);
	const [initialRetweets, setInitialRetweets] = useState([]);
	const [initialQuotedTweets, setInitialQuotedTweets] = useState([]);

	return (
		<InitialStatusContext.Provider
			value={{
				initialStatuses,
				setInitialStatuses,
				initialTweets,
				setInitialTweets,
				initialRetweets,
				setInitialRetweets,
				initialQuotedTweets,
				setInitialQuotedTweets,
			}}
		>
			{props.children}
		</InitialStatusContext.Provider>
	);
};

export default InitialStatusContextProvider;
