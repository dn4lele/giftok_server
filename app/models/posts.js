const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  description: String,
  author: String,
  gif: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  likes: [Schema.Types.ObjectId],
});

const Posts = model("Posts", postsSchema);
module.exports = Posts;
