const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		email: { type: String, trim: true, require: true },
		password: { type: String, trim: true, require: true },
		photo: { type: String },
		age: { type: Number },
	},
	{ TimeRanges: true }
);
const User = new mongoose.model("user", userSchema);
module.exports = User;
