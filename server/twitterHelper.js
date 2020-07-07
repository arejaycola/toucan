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
		const response = await client.get(`https://api.twitter.com/1.1/statuses/user_timeline.json`, params);
		return response;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching tweets.');
	}
}

async function getTweetsByUserId(userId, numberOfTweets) {
	let number = 200;
	let results = [];
	let maxId = -1;

	let params = {};
	try {
		if (maxId == -1) {
			params = {
				user_id: userId,
				count: 200,
				include_rts: true,
			};
		} else {
			params = {
				user_id: userId,
				count: 200,
				include_rts: true,
				max_id: maxId,
			};
		}

		while (number == 200 && results.length <= numberOfTweets) {
			let response = await getTweets(params);
			maxId =
				Math.max.apply(
					Math,
					response.map(function (o) {
						return o.id;
					})
				) - 1;
			results = [...results, ...response];
			number = response.length;
		}
		return results;
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

		return response;
	} catch (e) {
		console.log(e);
		throw new Error(e);
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
}

function getVerifiedUsers(users) {
	return users.filter((user) => {
		return user.verified;
	});
}

module.exports = { getRateLimitStatus, searchForVerifiedUser, getUser, getTweetsByUserId, getUsersByIds };
