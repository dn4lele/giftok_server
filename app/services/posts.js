const { ObjectId } = require("mongodb");
const Posts = require("../models/posts");
const Comments = require("../models/comments");

module.exports = {
  createPost: async (description, author, gif, location) => {
    const likes = [];

    const newPost = new Posts({
      description: description,
      author: author,
      gif: gif,
      location: {
        type: "Point",
        coordinates: location,
      },
      likes: likes,
    });

    return newPost.save();
  },
  getPostPaging: async (page) => {
    const perPage = 1;
    const posts = await Posts.find({})
      .skip(perPage * page - perPage)
      .limit(perPage);

    return posts;
  },

  getuserposts: async (username) => {
    const posts = await Posts.find({ author: username });
    return posts;
  },

  addlike: async (postid, userid) => {
    const post = await Posts.findOne({ _id: postid });
    const likes = post.likes;
    if (likes.includes(userid)) {
      const index = likes.indexOf(userid);
      likes.splice(index, 1);
    } else {
      likes.push(userid);
    }
    const updated = await Posts.updateOne({ _id: postid }, { likes: likes });
    return updated;
  },

  youliked: async (postid, userid) => {
    const post = await Posts.findOne({ _id: postid });
    const likes = post.likes;
    return likes.includes(userid);
  },

  getPosts: async (description) => {
    const posts = await Posts.find({ $text: { $search: description } });
    return posts;
  },

  getPostsByRadio: async (start, end, yourposition) => {
    const radiosposts = await Posts.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [yourposition[0], yourposition[1]],
          },
          $minDistance: start,
          $maxDistance: end,
        },
      },
    });

    return radiosposts;
  },
  getpostbyuserid: async (id) => {
    const posts = await Posts.find({ author: id });
    return posts;
  },
  getmostliked: async (id) => {
    // do aggregation to get the most liked post that the user is also liked
    const post = await Posts.aggregate([
      {
        $match: {
          likes: new ObjectId(id),
        },
      },
      {
        $sort: {
          likes: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    return post;
  },

  deletePost: async (id) => {
    console.log("before delete comments");
    try {
      await Comments.deleteMany({ postid: _id });
    } catch (err) {
      console.log(err);
    }

    console.log("after delete comments");

    const deleted = await Posts.deleteOne({ _id: id });
    return deleted;
  },
  getpostbyid: async (id) => {
    const post = await Posts.findOne({ _id: id });
    return post;
  },
};
