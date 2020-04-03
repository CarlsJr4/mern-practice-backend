const express = require('express');
const router = express.Router();
const users = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/', async (req, res) => {
	try {
		const newUser = new users(_.pick(req.body, ['username', 'email', 'password']));
		const hashed = await bcrypt.hash(newUser.password, 10);
		newUser.password = hashed;
		await newUser.save();
		const token = jwt.sign({ id: newUser._id}, config.placeholderKey);
		// Access token sent to client. Client saves to localStorage. Then, server must check for the token? 
		res.set('X-access-token', token).send(newUser);
	}
	catch (ex) {
		res.send(ex);
	}
});

module.exports = router;