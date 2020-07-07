const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const Twitter = require('./twitterHelper');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
// app.use('/', express.static(path.join(__dirname, '../client/build')));

app.get('/api/twitter/search/:text', async (req, res) => {
	let searchString = req.params.text;
	
	let results = await Twitter.searchForVerifiedUser(searchString);
	res.send(results);
});

app.get('/api/twitter/user/:userid', async (req, res) => {
	let id = req.params.userid;
	let results = await Twitter.getUser(id);
	res.send(results);
});

app.get('/api/twitter/user/:userid/tweets/:numberOfTweets', async (req, res) => {
	let id = req.params.userid;
	const numberOfTweets = req.params.numberOfTweets;

	let results = await Twitter.getTweetsByUserId(id, numberOfTweets);
	res.send(results);
});

app.post('/api/twitter/users', async (req, res) => {
	try {
		let userIds = req.body.user_ids;
		let chunks = [];
		let index = 0;
		let results = [];
		// console.log(userIds.length);
		while (index < userIds.length) {
			// console.log("Index ", index);
			chunks.push(userIds.slice(index, index + 100));
			index += 100;
		}

		for (let i = 0; i < chunks.length; i++) {
			/* Get the comma separated list of ids. */
			const chunk = chunks[i].toString();
			const response = await Twitter.getUsersByIds(chunk);
			results = [...results, ...response];
		}

		res.send(results);
	} catch (e) {
		console.log(e);
	}
});

app.get('*', async function (req, res) {
	// res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
