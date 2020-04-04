const express = require('express');
const router = express.Router();
const posts = require('../models/posts');
const _ = require('lodash');

// New tasks: 
// Authentication middleware (After login is successfully implemented)
// Handle authentication errors clientside
// Implement author subdocuments for each post 

// Next steps: Author subdocuments

// Default route
// Should implement a try/catch block here
router.get('/', async (req, res) => {
	try {
		const allPosts = await posts.find();
		res.send(allPosts);
	}
	catch (ex) {
		next(ex);
	}
});

// Create new post
router.post('/', async (req, res, next) => {
	try {
		const newPost = new posts(_.pick(req.body, ['title', 'author', 'body']));
		await newPost.save();
		res.send(newPost);
	} catch (ex) {
		res.status(400).send(ex)
		next(ex);
	}
});

// Delete a post
// How to make it so that you can only delete your own posts?
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