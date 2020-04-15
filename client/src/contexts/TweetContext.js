import React, { createContext, useState } from 'react';

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);
	const [retweets, setRetweets] = useState([]);
	const [quotedTweets, setQuotedTweets] = useState([]);

	const [tweetsCount, setTweetsCount] = useState(0);
	const [tweetsToUnverifiedCount, setTweetsToUnverifiedCount] = useState(0);

	const [retweetsCount, setRetweetsCount] = useState(0);
	const [retweetsToUnverifiedCount, setRetweetsToUnverifiedCount] = useState(0);

	const [quotedTweetsCount, setQuotedTweetsCount] = useState(0);
	const [quotedTweetsToUnverifiedCount, setQuotedTweetsToUnverifiedCount] = useState(0);

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
				retweetsCount,
				setRetweetsCount,
				retweetsToUnverifiedCount,
				setRetweetsToUnverifiedCount,
				quotedTweetsCount,
				setQuotedTweetsCount,
				quotedTweetsToUnverifiedCount,
				setQuotedTweetsToUnverifiedCount,
			}}
		>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
