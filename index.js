// Your goal is to build a small social media application
// There will be posts, users, comments, and likes
// Build the backend here, have your React frontend interact with the web server
// First, focus on backend only. Then, focus on frontend only. 
// Your last step will be to make the two talk to eachother.
// Then, you will deploy your app to the internet
const express = require('express');
const app = express();
const port = 3000;

const posts = require('./routes/posts');

app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));