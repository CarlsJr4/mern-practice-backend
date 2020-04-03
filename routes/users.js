const express = require('express');
const router = express.Router();
const users = require('../models/users');
const _ = require('lodash');

router.post('/', async (req, res) => {
	try {
		const newUser = new users(_.pick(req.body, ['username', 'email', 'password']));
		await newUser.save()
		res.send(newUser);
	}
	catch (ex) {
		res.send(ex);
	}
});

module.exports = router;