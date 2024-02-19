const {
  getUser,
  createUser,
  updateUser,
  getUserPic,
  deleteUser,
  getUsers,
  getUserbyid,
  updateUserFollow,
  getmostfollowers,
  getuserfollowers,
  getuserfollowing,
} = require("../services/users");
const { getsmallgif } = require("../utils/picturs");
module.exports = {
  getUser: async (req, res) => {
    try {
      const { nameoremail, pass } = req.query;
      const user = await getUser(nameoremail, pass);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const image = await getsmallgif();
      const { name, email, pass } = req.body;
      const newProduct = await createUser(name, email, pass, image);

      res.json(newProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;

      const updated = await updateUser(id, updatedUser);
      res.json(updated);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUserPic: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserPic(id);
      res.json([user.image, user.name, id]);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteUser(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getUsers: async (req, res) => {
    try {
      const { name } = req.params;
      const users = await getUsers(name);
      res.json(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUserbyid: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserbyid(id);
      res.json(user);
    } catch (err) {
      res.status;
    }
  },
  updateUserFollow: async (req, res) => {
    try {
      const { follwer, thefollow } = req.params;
      const updated = await updateUserFollow(follwer, thefollow);
      res.json(updated);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getmostfollowers: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getmostfollowers(id);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  wasfollow: async (req, res) => {
    try {
      const { follwer, thefollow } = req.params;
      const user = await getUserbyid(follwer);
      const wasfollow = user.followers.includes(thefollow);
      res.json(wasfollow);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getfollowers: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await getuserfollowers(id);
      res.json(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getfollowing: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await getuserfollowing(id);
      res.json(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
