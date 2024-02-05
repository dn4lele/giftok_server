const {
  createPost,
  getPostPaging,
  getuserposts,
  addlike,
  youliked,
  getPosts,
  getpostbyuserid,
  getPostsByRadio,
  getmostliked,
  deletePost,
  getpostbyid,
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
  getPosts: async (req, res) => {
    try {
      const { description } = req.params;
      const posts = await getPosts(description);
      res.json(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getPostsByRadio: async (req, res) => {
    try {
      const { radios, yourposition } = req.params;
      let start = 0;
      let end = 0;

      const personpos = yourposition.split(",");
      if (radios.includes("-")) {
        const radios2 = radios.split("-");
        start = radios2[0];
        end = radios2[1];
      } else {
        start = 0;
        end = radios;
      }
      const posts = await getPostsByRadio(start, end, personpos);

      res.json(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getpostbyuserid: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await getpostbyuserid(id);
      res.json(post);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getmostliked: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await getmostliked(id);
      res.json(post);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deletePost(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getpostbyid: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await getpostbyid(id);
      res.json(post);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
