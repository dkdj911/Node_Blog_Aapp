const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then((e) => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
