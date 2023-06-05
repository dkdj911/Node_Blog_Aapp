var jwt = require("jsonwebtoken");
const userModel = require("../model/User");

exports.isSignedIn = async (req, res, next) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        message: "login first",
      });
    }
    const decoded = await jwt.verify(token, "thisissecret");

    req.user = await userModel.findById(decoded.id);
  } else {
    return res.status(404).json({
      message: "Auth token missing",
    });
  }
  next();
};
