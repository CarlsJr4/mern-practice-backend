const express = require('express');
const router = express.Router();
const posts = require('../models/posts');
const _ = require('lodash');

// Default route
router.get('/', async (req, res) => {
	const allPosts = await posts.find();
	res.send(allPosts);
});

// Get post by ID
router.get('/:postId', async (req, res) => {
	let post
	try {
		post = await posts.findById(req.params.postId);
		res.send(post);
	}
	catch {
		if (!post) res.status(404).send('Could not find the specified user.');
	}
});

// Create new post
router.post('/', async (req, res, next) => {
	try {
		const newPost = new posts(_.pick(req.body, ['title', 'author', 'body']));
		await newPost.save();
		res.send(newPost);
	} catch (ex) {
		next(ex);
	}
});

// Delete a post
router.delete('/:postId', async (req, res) => {
	let post;
	try {
		const post = await posts.findByIdAndDelete(req.params.postId);
		res.send(post);
	} 
	catch {
		if (!post) res.status(404).send('Could not find the specified user.');
	}
});

module.exports = router;