const postModel = require("../model/Post");
const { validationResult } = require("express-validator");

exports.addPost = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const postDetails = req.body;
		postDetails.user = req.user._id;
		const post = new postModel(postDetails);
		const newPost = await post.save();
		return res.status(201).json({
			message: "post successfuly created",
			post: newPost,
		});
	} catch (error) {
		return res.status(401).json({
			message: "something went wrong",
			error: error,
		});
	}
};
exports.getAllPost = async (req, res) => {
	try {
		const post = await postModel.find().populate("user");
		return res.status(200).json({
			message: "post fetched successfully",
			post: post,
		});
	} catch (error) {
		return res.status(200).json({
			message: "something went wrong",
			error: error,
		});
	}
};
exports.editPOst = async (req, res) => {
	try {
		const { postId } = req.params;
		const postDetails = req.body;
		const updatedPost = await postModel.findOneAndUpdate(
			{ _id: postId },
			postDetails,
			{
				new: true,
			}
		);
		return res.status(201).json({
			message: "post updated successfully",
			post: updatedPost,
		});
	} catch (error) {
		return res.status(201).json({
			message: "post updated successfully",
			post: updatedPost,
		});
	}
};
exports.deletePost = async (req, res) => {
	try {
		const { postId } = req.params;
		const deletedPost = await postModel.findOneAndDelete({ _id: postId });
		return res.status(204).json({});
	} catch (error) {
		return res.status(401).json(error);
	}
};
exports.getSinglePost = async (req, res) => {
	const { postId } = req.params;
	const post = await postModel.findOne({ _id: postId });
	return res.status(200).json({
		post: post,
	});
};
