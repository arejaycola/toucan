import React, { createContext, useState } from 'react';

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);
	const [retweets, setRetweets] = useState([]);
	const [quotedTweets, setQuotedTweets] = useState([]);

	return (
		<TweetContext.Provider value={{ tweets, setTweets, retweets, setRetweets, quotedTweets, setQuotedTweets }}>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
