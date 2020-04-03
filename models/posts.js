const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Next step: Add validation to your social media posts
// Also add ability to delete posts
const postSchema = new Schema({
	title: { 
		type: String,
		required: true,
		maxlength: 100
	},
	author: { 
		type: String,
		required: true,
		maxlength: 25
	},
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