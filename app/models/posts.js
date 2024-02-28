const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  description: String,
  author: ObjectId,
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

postsSchema.index({ description: "text" }, { default_language: "none" });
postsSchema.index({ location: "2dsphere" });

const Posts = model("Posts", postsSchema);
module.exports = Posts;
