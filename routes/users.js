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
		res.set('X-access-token', token).send(newUser);
	}
	catch (ex) {
		res.send(ex);
	}
});

// Goal for login: determine if the user exists, compare hashed password, then send JWT
router.post('/login', async (req, res) => {
	try {
		// Check if user exists
		const user = await users.findOne({ email: req.body.email });
		if (!user) res.status(404).send('User with specified email was not found.');

		// Compared hashed password
		const authenticated = await bcrypt.compare(req.body.password, user.password);
		if (!authenticated) res.status(400).send('Username or password was incorrect');

		// Send JWT
		const token = await jwt.sign({ id: user._id}, config.placeholderKey);
		res.set('X-access-token', token).send(user);
	}
	catch (ex) {
		res.send(ex)
	}
})

module.exports = router;