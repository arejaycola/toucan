import React, { createContext, useState } from 'react';

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);
	const [retweets, setRetweets] = useState([]);
	const [quotedTweets, setQuotedTweets] = useState([]);
	const [tweetsToUnverifiedCount, setTweetsToUnverifiedCount] = useState(0);
	const [tweetsCount, setTweetsCount] = useState(0);

	return (
		<TweetContext.Provider
			value={{
				tweets,
				setTweets,
				retweets,
				setRetweets,
				quotedTweets,
				setQuotedTweets,
				tweetsToUnverifiedCount,
				setTweetsToUnverifiedCount,
				tweetsCount,
				setTweetsCount,
			}}
		>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
