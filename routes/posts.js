// Worry about optimizing/cleaning up code later. Right now, just focus on building.
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('All posts.')
});

router.get('/:postId', (req, res) => {
	res.send(req.params.postId);
});

router.post('/', (req, res) => {
	res.send('Post request sent.')
});

router.delete('/', (req, res) => {
	res.send('Post deleted.')
});

module.exports = router;