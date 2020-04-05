const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { 
		type: String,
		required: true,
		maxlength: 100
	},
	// Subdocument that references authors
	author: new Schema({
		_id: {
			type: mongoose.Types.ObjectId,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	}),
	datePosted: {
		type: Date,
		default: Date.now()
	},
	body: { 
		type: String,
		required: true
	},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;