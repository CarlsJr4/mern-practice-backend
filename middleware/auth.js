const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = async function (req, res, next) {
	const token = req.get('x-access-token');
	if (!token) return res.status(401).send('You must login to access this resource');
	try {
		jwt.verify(token, config.placeholderKey);
	} 
	catch {
		return res.status(403).send('Invalid web token. ')
	}
	next();
}