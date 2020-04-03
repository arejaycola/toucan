require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { searchForVerifiedUser } = require('./twitterHelper');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.post('/api/twitter/search', async (req, res) => {
	console.log('here');
	let searchString = req.body.searchString;
	let results = await searchForVerifiedUser(searchString);
	res.send(results);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
