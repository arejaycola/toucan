import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
	const [isStatusLoading, setIsStatusLoading] = useState(true);
	const [isTweetsLoading, setIsTweetsLoading] = useState(true);
	const [isRetweetsLoading, setIsRetweetsLoading] = useState(true);
	const [isQuotedTweetsLoading, setIsQuotedTweetsLoading] = useState(true);
	const [timeoutLength, setTimeoutLength] = useState(30000);

	return (
		<LoadingContext.Provider
			value={{
				isStatusLoading,
				isTweetsLoading,
				isRetweetsLoading,
				isQuotedTweetsLoading,
				timeoutLength,
				setIsStatusLoading,
				setIsTweetsLoading,
				setIsRetweetsLoading,
				setIsQuotedTweetsLoading,
				setTimeoutLength,
			}}
		>
			{props.children}
		</LoadingContext.Provider>
	);
};

export default LoadingContextProvider;
