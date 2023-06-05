const commentModel = require("../model/Comment");

exports.addComment = async (req, res) => {
	try {
		const commentDetails = req.body;
		commentDetails.user = req.user._id;

		const comment = new commentModel(commentDetails);
		const newComment = await comment.save();
		return res.status(201).json({
			message: "post successfuly created",
			comment: newComment,
		});
	} catch (error) {
		return res.status(401).json({
			message: "something went wrong",
			error: error,
		});
	}
};
exports.getAllComment = async (req, res) => {
	try {
		const { postId } = req.params;

		const comment = await commentModel
			.find({ post: postId })
			.populate("user")
			.populate("post");
		return res.status(200).json({
			message: "comment fetched successfully",
			comment: comment,
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
		const { commentId } = req.params;
		const commentDetails = req.body;
		const updatedComment = await commentModel.findOneAndUpdate(
			{ _id: commentId },
			commentDetails,
			{
				new: true,
			}
		);
		return res.status(201).json({
			message: "post updated successfully",
			commentt: updatedComment,
		});
	} catch (error) {
		return res.status(401).json(error);
	}
};
exports.deletePost = async (req, res) => {
	try {
		const { commentId } = req.params;
		const post = await commentModel.findOneAndDelete({ _id: commentId });
		return res.status(204).json({});
	} catch (error) {
		return res.status(204).json(error);
	}
};
