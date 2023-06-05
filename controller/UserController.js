const userModel = require("../model/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const userDeatils = req.body;
		const isEmailExist = await userModel.findOne({
			email: userDeatils.email,
		});
		if (isEmailExist) {
			return res.status(401).json({
				message: "email already exist, try another",
				status: false,
			});
		}

		userDeatils.password = await bcrypt.hash(userDeatils.password, 10);
		const user = new userModel(userDeatils);
		const newUser = await user.save();
		const token = await jwt.sign({ id: newUser._id }, "thisissecret");

		return res.status(201).json({
			user: newUser,
			token: token,
			status: true,
		});
	} catch (error) {
		return res.status(201).json({
			message: "something went wrong",
			error: error,
			status: false,
		});
	}
};

exports.signin = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array(), status: false });
	}
	try {
		const { email, password } = req.body;
		const isUserExist = await userModel.findOne({ email: email });
		if (isUserExist) {
			let isPasswordMatched = await bcrypt.compare(
				password,
				isUserExist.password
			);
			if (isPasswordMatched) {
				const token = await jwt.sign({ id: isUserExist._id }, "thisissecret");
				return res.status(200).json({
					message: "user logged in seccessfully",
					token: token,
					status: true,
				});
			} else {
				return res.status(201).json({
					message: "wrong credential",
					status: false,
				});
			}
		} else {
			return res.status(201).json({
				message: "wrong credential",
				status: false,
			});
		}
	} catch (error) {
		return res.status(201).json({
			message: "wrong credential",
			status: false,
		});
	}
};
