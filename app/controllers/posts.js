const {
  createPost,
  getPostPaging,
  getuserposts,
  addlike,
  youliked,
} = require("../services/posts");
const { getgifsbyname } = require("../utils/picturs");

module.exports = {
  createPost: async (req, res) => {
    try {
      const { caption, author, gif, location } = req.body;
      const newPost = await createPost(caption, author, gif, location);
      res.json(newPost);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getgifs: async (req, res) => {
    try {
      const { gifname } = req.params;
      const gifs = await getgifsbyname(gifname);
      res.json(gifs);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getPostsPaging: async (req, res) => {
    try {
      const { page } = req.params;
      const posts = await getPostPaging(page);
      res.json(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getuserposts: async (req, res) => {
    try {
      const { username } = req.params;
      const posts = await getuserposts(username);
      res.json(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addlike: async (req, res) => {
    try {
      const { postid, userid } = req.params;
      const updated = await addlike(postid, userid);
      res.json(updated);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  youliked: async (req, res) => {
    try {
      const { postid, userid } = req.params;
      const updated = await youliked(postid, userid);
      res.json(updated);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
