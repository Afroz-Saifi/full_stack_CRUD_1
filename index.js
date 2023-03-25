const express = require("express");
require("dotenv").config();
const { connectDb } = require("./db/db");
const { userRouter } = require("./routes/user.route");
const { jwtAuth } = require("./middleware/jwt.middleware");
const { storyRouter } = require("./routes/story.route");

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use(jwtAuth);
app.use("/story", storyRouter);

app.listen(process.env.port, () => {
  console.log(`server running on port ${process.env.port}`);
  try {
    connectDb(process.env.mongoURL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
});
