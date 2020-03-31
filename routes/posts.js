// Worry about optimizing/cleaning up code later. Right now, just focus on building.
const express = require('express');
const router = express.Router();
const posts = require('../models/posts');
const _ = require('lodash');

router.get('/', async (req, res) => {
	const allPosts = await posts.find();
	res.send(allPosts);
});

// In this get request, we need to check if the ID exists
router.get('/:postId', async (req, res) => {
	const post = await posts.findById(req.params.postId);
	res.send(post);
});

// In a post request, we need validation
router.post('/', async (req, res) => {
	const newPost = new posts(_.pick(req.body, ['title', 'author', 'body']));
	await newPost.save();
	res.send(newPost);
});

router.delete('/:postId', async (req, res) => {
	const post = await posts.findByIdAndDelete(req.params.postId);
	res.send(post);
});

module.exports = router;