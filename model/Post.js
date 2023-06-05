const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
	{
		title: { type: String, trim: true, require: true },
		description: { type: String, trim: true, require: true },
		approved: { type: Boolean, default: false },

		user: { type: mongoose.Schema.ObjectId, ref: "user" },
	},
	{ TimeRanges: true }
);
const Post = new mongoose.model("post", postSchema);
module.exports = Post;
