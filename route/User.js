const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/Auth");
const { body } = require("express-validator");

router.post(
	"/user/signup",
	[
		body("name", "name should be minumum two character").isLength({ min: 2 }),
		body("email", "enter a valid email").isEmail(),
		body("password", "password shoulb be minimum of five character").isLength({
			min: 5,
		}),
	],

	userController.signup
);
router.post(
	"/user/signin",
	[
		body("email", "enter a valid email").isEmail(),
		body("password", "password shoulb be minimum of five character").isLength({
			min: 5,
		}),
	],
	userController.signin
);
router.get("/users", authMiddleware.isSignedIn, (req, res) => {
	res.json({
		fkrf: "geg",
	});
});
module.exports = router;
