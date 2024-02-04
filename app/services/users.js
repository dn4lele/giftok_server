const Users = require("../models/users");
const Posts = require("../models/posts");

module.exports = {
  getUser: async (nameoremail, pass) => {
    const user = await Users.findOne({
      $or: [{ name: nameoremail }, { email: nameoremail }],
      pass: pass,
    });

    return user;
  },
  createUser: async (name, email, pass, image) => {
    const existingUser = await Users.findOne({
      name: name,
      email: email,
      pass: pass,
    });

    if (existingUser) {
      return existingUser;
    }

    following = [];
    followers = [];

    const newUser = new Users({
      name,
      email,
      pass,
      image,
      following,
      followers,
    });
    return newUser.save();
  },

  updateUser: async (id, updatedUser) => {
    const existingUser = await Users.findOne({
      $or: [{ name: updatedUser.name }, { email: updatedUser.email }],
      _id: { $ne: id },
    });
    if (existingUser) {
      return "There is already a user with this name or email.";
    }

    const updated = await Users.updateOne({ _id: id }, updatedUser);
    return updated;
  },

  getUserPic: async (username) => {
    const user = await Users.findOne({ name: username });
    return user;
  },
  deleteUser: async (id) => {
    const deleted = await Users.deleteOne({ _id: id });
    //remove his id from all followers and following and from all the posts he liked

    const users = await Users.find({});

    users.forEach(async (user) => {
      if (user.followers.includes(id)) {
        const index = user.followers.indexOf(id);
        user.followers.splice(index, 1);
        await user.save();
      }
      if (user.following.includes(id)) {
        const index = user.following.indexOf(id);
        user.following.splice(index, 1);
        await user.save();
      }
    });
    const posts = await Posts.find({});
    posts.forEach(async (post) => {
      if (post.likes.includes(id)) {
        const index = post.likes.indexOf(id);
        post.likes.splice(index, 1);
        await post.save();
      }
    });

    return deleted;
  },
};
