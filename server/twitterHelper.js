const Twitter = require('twitter');

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
		// console.log(tweets);
	}
});

async function searchForVerifiedUser(name) {
	try {
		const response = await client.get('https://api.twitter.com/1.1/users/search.json', { q: `${name}`, count:20, page: 1, include_entities: false });
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

function getVerifiedUsers(users) {
	return users.filter((user) => {
		return user.verified;
	});
}

module.exports = { searchForVerifiedUser };
