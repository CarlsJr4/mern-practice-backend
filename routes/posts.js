const express = require('express');
const router = express.Router();
const Posts = require('../models/Posts');
const Users = require('../models/users');
const _ = require('lodash');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// New tasks: 
// Handle authentication errors clientside

// Default route
router.get('/', auth, async (req, res) => {
	try {
		const allPosts = await Posts.find();
		res.send(allPosts);
	}
	catch (ex) {
		next(ex);
	}
});

// Create new post
router.post('/', auth, async (req, res, next) => {
	const token = req.get('x-access-token');
	const decoded = jwt.decode(token);
	
	// Find user by ID
	// We don't need a catch block because the user is already authenticated?
	const userInfo = await Users.findById(decoded.id);

	// Create a subdocument object with the author's information
	req.body.author = _.pick(userInfo, ['_id', 'username']);

	// Now, that author is an object, we can assign it to a new post document
	try {
		const newPost = new Posts(_.pick(req.body, ['title', 'author', 'body']));
		await newPost.save();
		res.send(newPost);
	} catch (ex) {
		res.status(400).send(ex)
		next(ex);
	}
});
 
// Delete a post
// How to make it so that you can only delete your own posts?
router.delete('/:postId', auth, async (req, res) => {
	let post;
	try {
		const post = await Posts.findByIdAndDelete(req.params.postId);
		res.send(post);
	} 
	catch {
		if (!post) res.status(404).send('Could not find the specified user.');
	}
});

module.exports = router;