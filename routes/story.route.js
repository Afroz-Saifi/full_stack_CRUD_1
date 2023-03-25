const express = require("express");
const {
  addStory,
  getAllPosts,
  getStoryById,
  deletePost,
  updatePost,
} = require("../controller/story.controller");
const { relationShip } = require("../middleware/relationship");

const storyRouter = express.Router();

storyRouter.post("/add", relationShip, addStory);
storyRouter.get("/", getAllPosts);
storyRouter.get("/:storyId", getStoryById);
storyRouter.delete("/delete/:storyId", deletePost);
storyRouter.patch("/update/:storyId", updatePost);

module.exports = { storyRouter };
