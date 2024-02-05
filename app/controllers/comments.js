const {
  createComment,
  getComments,
  deleteComment,
  deletebyPostid,
} = require("../services/comments");

module.exports = {
  createComment: async (req, res) => {
    try {
      const { text, postid, by } = req.body;
      const newComment = await createComment(text, postid, by);
      res.json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getComments: async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await getComments(id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteComment(id);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deletebyPostid: async (req, res) => {
    try {
      const { postid } = req.params;
      const deleted = await deletebyPostid(postid);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
