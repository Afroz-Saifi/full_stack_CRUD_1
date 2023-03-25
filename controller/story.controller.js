const { storyModel } = require("../model/story.model");
const jwt = require("jsonwebtoken");

const addStory = async (req, res) => {
  try {
    const storyData = new storyModel(req.body);
    await storyData.save();
    return res.status(200).send({ msg: "story posted successfully" });
  } catch (error) {
    return res.status(400).send({ err: error });
  }
};

const getAllPosts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.secretKey);
  const userId = decoded.userId;
  try {
    const userPostsData = await storyModel.find({ userId });
    if (userPostsData.length > 0) {
      return res.status(200).send(userPostsData);
    } else {
      return res.status(404).send({ msg: "no posts are available" });
    }
  } catch (error) {}
};

const getStoryById = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.secretKey);
  const userId = decoded.userId;
  const { storyId } = req.params;
  try {
    const storyData = await storyModel.findOne({ userId, _id: storyId });
    if (storyData) {
      return res.status(200).send(storyData);
    } else {
      return res.status(404).send({ msg: "post not found" });
    }
  } catch (error) {
    return res.status(400).send({ err: error });
  }
};

const deletePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.secretKey);
  const userId = decoded.userId;
  const { storyId } = req.params;
  try {
    const storyData = await storyModel.deleteOne({ userId, _id: storyId });
    if (storyData.deletedCount > 0) {
      return res.status(200).send({ msg: "post has deleted" });
    } else {
      return res.status(404).send({ msg: "post not found" });
    }
  } catch (error) {
    return res.status(400).send({ err: error });
  }
};

const updatePost = async (req, res) => {
  const rawData = req.body;
  const { storyId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.secretKey);
  const userId = decoded.userId;
  try {
    const updatedData = await storyModel.updateOne(
      { userId, _id: storyId },
      rawData
    );
    if (updatedData.matchedCount > 0) {
      return res.status(200).send({
        msg: "post has updated",
        total_updates: updatedData.modifiedCount,
      });
    } else {
      return res.status(400).send({ msg: "post not found" });
    }
  } catch (error) {
    return res.status(400).send({ err: error });
  }
};

module.exports = {
  addStory,
  getAllPosts,
  getStoryById,
  deletePost,
  updatePost,
};
