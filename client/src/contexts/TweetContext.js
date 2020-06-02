import React, { createContext, useState } from 'react';

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [statuses, setStatuses] = useState([]);
	const [tweets, setTweets] = useState([]);
	const [retweets, setRetweets] = useState([]);
	const [quotedTweets, setQuotedTweets] = useState([]);

	const [tweetsCount, setTweetsCount] = useState(0);
	const [tweetsToUnverifiedCount, setTweetsToUnverifiedCount] = useState(0);

	const [retweetsCount, setRetweetsCount] = useState(0);
	const [retweetsToUnverifiedCount, setRetweetsToUnverifiedCount] = useState(0);

	const [quotedTweetsCount, setQuotedTweetsCount] = useState(0);
	const [quotedTweetsToUnverifiedCount, setQuotedTweetsToUnverifiedCount] = useState(0);

	const [globalVerifiedDayCount, setGlobalVerifiedDayCount] = useState(Array(7).fill(0));
	const [globalVerifiedHourCount, setGlobalVerifiedHourCount] = useState(Array(24).fill(0));
	const [globalUnverifiedDayCount, setGlobalUnverifiedDayCount] = useState(Array(7).fill(0));
	const [globalUnverifiedHourCount, setGlobalUnverifiedHourCount] = useState(Array(24).fill(0));

	const [verifiedRetweetsTime, setVerifiedRetweetsTime] = useState(Array(24).fill(0));
	const [unverifiedRetweetsTime, setUnverifiedRetweetsTime] = useState(Array(24).fill(0));

	const [unverifiedTweetsTime, setUnverifiedTweetsTime] = useState(Array(24).fill(0));
	const [verifiedTweetsTime, setVerifiedTweetsTime] = useState(Array(24).fill(0));

	return (
		<TweetContext.Provider
			value={{
				statuses,
				setStatuses,
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

				

				verifiedRetweetsTime,
				setVerifiedRetweetsTime,
				unverifiedRetweetsTime,
				setUnverifiedRetweetsTime,

				verifiedTweetsTime,
				setVerifiedTweetsTime,
				unverifiedTweetsTime,
				setUnverifiedTweetsTime,



				retweetsToUnverifiedCount,
				setRetweetsToUnverifiedCount,
				quotedTweetsCount,
				setQuotedTweetsCount,
				quotedTweetsToUnverifiedCount,
				setQuotedTweetsToUnverifiedCount,
				globalVerifiedDayCount,
				setGlobalVerifiedDayCount,
				globalVerifiedHourCount,
				setGlobalVerifiedHourCount,
				globalUnverifiedDayCount,
				setGlobalUnverifiedDayCount,
				globalUnverifiedHourCount,
				setGlobalUnverifiedHourCount,
			}}
		>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
