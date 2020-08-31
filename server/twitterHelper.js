const Twitter = require('twitter');

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const getUser = async (id) => {
	try {
		const response = await client.get(`https://api.twitter.com/1.1/users/show.json`, {
			user_id: id,
		});

		return response;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching user.');
	}
};

async function searchForVerifiedUser(name) {
	try {
		const response = await client.get('https://api.twitter.com/1.1/users/search.json', {
			q: `${name}`,
			count: 20,
			page: 1,
			include_entities: false,
		});
		var verifiedUsers = getVerifiedUsers(response);

		if (!verifiedUsers) {
			throw new Error(`${name} is not a verified user.`);
		}

		return verifiedUsers;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching user.');
	}
}

async function getTweets(params) {
	try {
		if (params.count === 0) {
			return;
		}

		const response = await client.get(`https://api.twitter.com/1.1/statuses/user_timeline.json`, params);

		return response;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching tweets.');
	}
}

// async function getInitialTweetsByUserId(userId, numberOfTweets) {
// 	/* TODO (07/17/2020 10:42) this is deprecated now. everything is sent through WS now*/
// 	let number = 200;
// 	let results = [];

// 	const params = {
// 		user_id: userId,
// 		count: 200,
// 		include_rts: true,
// 	};
// 	try {
// 		while (results.length <= numberOfTweets) {
// 			let response = await getTweets(params);
// 			params.max_id = response[response.length - 1].id_str;

// 			results = [...results, ...response];
// 			number = response.length;

// 			console.log(params.max_id);
// 		}
// 		return results;
// 	} catch (e) {
// 		console.log(e);
// 		throw new Error('Error fetching user.');
// 	}
// }

async function getAutoFetchTweetsByUserId(socket, userId, numberOfTweets) {
	let count = 0;

	const params = {
		user_id: userId,
		count: 200,
		include_rts: true,
	};
	// console.log('Number of Tweets: ' + numberOfTweets);
	try {
		while (count <= numberOfTweets) {
			numberOfTweets - count < 200 ? (params.count = numberOfTweets - count) : numberOfTweets;
			if (params.count === 0) {
				break;
			}

			let response = await getTweets(params);

			params.max_id = response[response.length - 1].id_str;

			const responseObject = {
				percentDone: parseFloat(count / numberOfTweets),
				initialFetch: true,
				response,
				status: 'pending',
			};

			count += response.length;
			/* If this is the initial fetch send a special flag to the client. */
			if (count > 200) {
				responseObject.initialFetch = false;
			}

			// console.log('Count: ' + count);
			socket.send(JSON.stringify(responseObject));
		}

		socket.send(JSON.stringify({ status: 'done' }));
		return 'done';
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching user.');
	}
}

async function getUsersByIds(userIds) {
	try {
		const response = await client.get(`https://api.twitter.com/1.1/users/lookup.json`, {
			user_id: userIds,
			count: 100,
		});

		let editedResponse = response.map((status) => {
			return {
				id: status.id,
				verified: status.verified,
			};
		});

		return editedResponse;
	} catch (e) {
		console.log(e[0].message);
		throw new Error(e.message);
	}
}

const getRateLimitStatus = async () => {
	try {
		const response = await client.get(`https://api.twitter.com/1.1/application/rate_limit_status.json`);

		return response;
	} catch (e) {
		console.log(e);
		throw new Error(e);
	}
};

function getVerifiedUsers(users) {
	return users.filter((user) => {
		return user.verified;
	});
}

module.exports = { getRateLimitStatus, searchForVerifiedUser, getUser, getAutoFetchTweetsByUserId, getUsersByIds };
