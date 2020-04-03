const express = require('express');
const router = express.Router();
const users = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
	try {
		const newUser = new users(_.pick(req.body, ['username', 'email', 'password']));
		const hashed = await bcrypt.hash(newUser.password, 10);
		newUser.password = hashed;
		await newUser.save()
		res.send(newUser);
	}
	catch (ex) {
		res.send(ex);
	}
});

module.exports = router;