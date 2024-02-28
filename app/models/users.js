const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  name: String,
  email: String,
  pass: String,
  image: String,
  following: [Schema.Types.ObjectId],
  followers: [Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now },
});

usersSchema.index({ name: "text" }, { default_language: "none" });

const Users = model("Users", usersSchema);
module.exports = Users;
