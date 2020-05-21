import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
	const [isStatusLoading, setIsStatusLoading] = useState(true);
	const [isTweetsLoading, setIsTweetsLoading] = useState(true);
	const [isRetweetsLoading, setIsRetweetsLoading] = useState(true);
	const [isQuotedTweetsLoading, setIsQuotedTweetsLoading] = useState(true);

	return (
		<LoadingContext.Provider
			value={{
				isStatusLoading,
				isTweetsLoading,
				isRetweetsLoading,
				isQuotedTweetsLoading,
				setIsStatusLoading,
				setIsTweetsLoading,
				setIsRetweetsLoading,
				setIsQuotedTweetsLoading,
			}}
		>
			{props.children}
		</LoadingContext.Provider>
	);
};

export default LoadingContextProvider;
