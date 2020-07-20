import React, { createContext, useState } from 'react';

export const StatusFilterContext = createContext();

const StatusFilterContextProvider = (props) => {
	const [showAllStatuses, setShowAllStatuses] = useState(true);
	const [showRetweets, setShowRetweets] = useState(true);
	const [showQuotedTweets, setShowQuotedTweets] = useState(true);
	const [showTweets, setShowTweets] = useState(true);

	return (
		<StatusFilterContext.Provider
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
		</StatusFilterContext.Provider>
	);
};

export default StatusFilterContextProvider;
