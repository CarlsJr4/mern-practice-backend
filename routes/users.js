const express = require('express');
const router = express.Router();
const users = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/register', async (req, res) => {
	try {
		const newUser = new users(_.pick(req.body, ['username', 'email', 'password']));
		const hashed = await bcrypt.hash(newUser.password, 10);
		newUser.password = hashed;
		await newUser.save();
		const token = await jwt.sign({ id: newUser._id}, config.placeholderKey);
		// Access token sent to client. Client saves to localStorage. Then, server must check for the token? 
		res.set('X-access-token', token).send({newUser, token});
	}
	catch (ex) {
		res.send(ex);
	}
});

// Also another goal: authentication middleware that prevents you from accessing the blog posts without a JWT
router.post('/login', async (req, res) => {
	// We get an error that says we can't set headers after sending
	try {
		// Check if user exists
		const user = await users.findOne({ email: req.body.email });
		if (!user) return res.status(404).send('User with specified email was not found.');
		
		// Nested try catch block to prevent users from submitting blank passwords
		// Should we use Joi validation here?
		try {
			const authenticated = await bcrypt.compare(req.body.password, user.password);
			if (!authenticated) return res.status(400).send('Username or password was incorrect');
		} 
		catch (ex) {
			return res.status(400).send('Username or password was incorrect.');
		}

		// Send JWT
		const token = await jwt.sign({ id: user._id}, config.placeholderKey);
		res.set('X-access-token', token).send({user, token});
	}
	catch (ex) {
		res.send(ex)
	}
})

module.exports = router;