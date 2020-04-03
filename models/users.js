const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 25,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 8,
		required: true
	}
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;