const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentsSchema = new Schema({
  text: String,
  postid: ObjectId,
  by: ObjectId,
  createdAt: { type: Date, default: Date.now },
});

const Comments = model("Comments", commentsSchema);
module.exports = Comments;
