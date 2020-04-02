require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { searchForVerifiedUser } = require('./twitterHelper');

const app = express();
const port = process.env.PORT || 5000;
const root = path.join(__dirname, '..', 'client', 'build');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.post('/twitter/search', async (req, res) => {
	let searchString = req.body.searchString;
	let results = await searchForVerifiedUser(searchString);
	res.send(results);
});

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

// app.get('/', (req, res) => {
// 	console.log(path.join(__dirname, '../client/build'));
// 	res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

app.post('/api/world', (req, res) => {
	console.log(req.body);
	res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
