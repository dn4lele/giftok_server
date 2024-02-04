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

const Users = model("Users", usersSchema);
module.exports = Users;
