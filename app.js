const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const userRouter = require("./route/User");
const postRouter = require("./route/Post");
const commentRouter = require("./route/comment");
require("./config/DB");
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRouter);
app.listen(port, () => {
  console.log("app running at 8000");
});
