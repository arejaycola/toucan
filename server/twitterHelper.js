const Twitter = require('twitter');

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
	if (!error) {
		// console.log(tweets);
	}
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

async function getLastThousandTweets(params) {
	try {
		const response = await client.get(`https://api.twitter.com/1.1/statuses/user_timeline.json`, params);

		return response;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching tweets.');
	}
}

async function getTweetsByUserId(userId) {
	let number = 199;
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
		while (number == 199 && results.length <= 1000) {
			let response = await getLastThousandTweets(params);

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
			count: 2000,
			include_rts: true,
		});

		return response;
	} catch (e) {
		console.log(e);
		throw new Error('Error fetching user.');
	}
}

function getVerifiedUsers(users) {
	return users.filter((user) => {
		return user.verified;
	});
}

module.exports = { searchForVerifiedUser, getUser, getTweetsByUserId, getUsersByIds };
