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
	let post
	try {
		post = await posts.findById(req.params.postId);
		res.send(post);
	}
	catch {
		if (!post) res.status(404).send('Could not find the specified user.')
	}
});

// In a post request, we need validation
router.post('/', async (req, res) => {
	try {
		const newPost = new posts(_.pick(req.body, ['title', 'author', 'body']));
		await newPost.save();
		res.send(newPost);
	} catch (ex) {
		res.status(400).send(ex);
	}
});

router.delete('/:postId', async (req, res) => {
	let post 
	try {
		const post = await posts.findByIdAndDelete(req.params.postId);
		res.send(post);
	} 
	catch {
		if (!post) res.status(404).send('Could not find the specified user.')
	}
});

module.exports = router;