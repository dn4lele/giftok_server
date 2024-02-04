const Posts = require("../models/posts");

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
    console.log(updated);
    return updated;
  },

  youliked: async (postid, userid) => {
    const post = await Posts.findOne({ _id: postid });
    const likes = post.likes;
    return likes.includes(userid);
  },
};
