// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = mongoose.connection;

// Database
mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongoDB'));

// Routes
const posts = require('./routes/posts');
const users = require('./routes/users')

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/posts', posts);
app.use('/api/users', users);

// Etc
app.get('/', (req, res) => res.send('Welcome to a placeholder social media site!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));