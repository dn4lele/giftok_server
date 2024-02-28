const Users = require("../models/users");
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const { ObjectId } = require("mongodb");

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

  getUserPic: async (id) => {
    const user = await Users.findOne({ _id: id });
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
      if (post.author == id) {
        await Comments.deleteMany({ postid: post._id });
        await Posts.deleteOne({ _id: post._id });
      }
    });

    return deleted;
  },

  getUsers: async (name) => {
    //get users by name with regex
    const users = await Users.find({ name: { $regex: name, $options: "i" } });
    return users;

    //better to do by regex because if i input daniel regex will return danielcool user and by $text it will not

    //i have index text on name
    /*
    const users = await Users.find({ $text: { $search: name } });
    return users;*/
  },

  getUserbyid: async (id) => {
    const user = await Users.findOne({ _id: id });
    return user;
  },

  updateUserFollow: async (follwer, follow) => {
    //if the follow in the follwer list remove it
    const user = await Users.findOne({ _id: follwer });
    if (user.followers.includes(follow)) {
      const index = user.followers.indexOf(follow);
      user.followers.splice(index, 1);
      await user.save();

      const user2 = await Users.findOne({ _id: follow });
      const index2 = user2.following.indexOf(follwer);
      user2.following.splice(index2, 1);
      await user2.save();

      return [user, "follow"];
    } else {
      user.followers.push(follow);
      await user.save();

      const user2 = await Users.findOne({ _id: follow });
      user2.following.push(follwer);
      await user2.save();

      return [user, "unfollow"];
    }
  },

  getmostfollowers: async (id) => {
    //get the most followed user that you also follow
    const mostFollowers = await Users.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $unwind: {
          path: "$following",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "theuser",
        },
      },
      {
        $unwind: {
          path: "$theuser",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$theuser._id",
          name: { $first: "$theuser.name" },
          image: { $first: "$theuser.image" },
          count: { $sum: { $size: "$theuser.followers" } },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    return mostFollowers;
  },
  getuserfollowers: async (id) => {
    const followers = await Users.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $unwind: {
          path: "$followers",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $unwind: {
          path: "$followers",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          followers: 1,
        },
      },
    ]);
    return followers;
  },
  getuserfollowing: async (id) => {
    const following = await Users.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $unwind: {
          path: "$following",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $unwind: {
          path: "$following",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          following: 1,
        },
      },
    ]);
    return following;
  },
  gettop3TotalMostLikes: async () => {
    //i want it to return me the top 3 users with the most total likes in their account
    //lookup every post group by author and sum the likes and to show also the likes amount

    const top3TotalMostLikes = await Posts.aggregate([
      {
        $group: {
          _id: "$author",
          count: { $sum: { $size: "$likes" } },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          name: "$user.name",
          image: "$user.image",
          count: 1,
        },
      },
    ]);

    return top3TotalMostLikes;
  },
};
