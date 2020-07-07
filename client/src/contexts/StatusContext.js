import React, { createContext, useState } from 'react';

export const StatusContext = createContext();

const StatusContextProvider = (props) => {
	const [showAllStatuses, setShowAllStatuses] = useState(false);
	const [showRetweets, setShowRetweets] = useState(false);
	const [showQuotedTweets, setShowQuotedTweets] = useState(true);
	const [showTweets, setShowTweets] = useState(false);

	return (
		<StatusContext.Provider
			value={{
				showAllStatuses,
				setShowAllStatuses,
				showRetweets,
				setShowRetweets,
				showQuotedTweets,
				setShowQuotedTweets,
				showTweets,
				setShowTweets,
			}}
		>
			{props.children}
		</StatusContext.Provider>
	);
};

export default StatusContextProvider;
