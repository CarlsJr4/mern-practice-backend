// Your goal is to build a small social media application
// There will be posts, users, comments, and likes
// Build the backend here, have your React frontend interact with the web server
// First, focus on backend only. Then, focus on frontend only. 
// Your last step will be to make the two talk to eachother.
// Then, you will deploy your app to the internet
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongoDB'));

const posts = require('./routes/posts');

app.use(express.json());
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Welcome to a placeholder social media site!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));