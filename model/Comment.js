const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
	{
		comment: { type: String },
		approved: { type: Boolean, default: false },
		post: { type: mongoose.Schema.ObjectId, ref: "post" },
		user: { type: mongoose.Schema.ObjectId, ref: "user" },
	},
	{ TimeRanges: true }
);
const Comment = new mongoose.model("comment", commentSchema);
module.exports = Comment;
