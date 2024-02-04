const {
  getUser,
  createUser,
  updateUser,
  getUserPic,
  deleteUser,
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
      console.log(req.body);
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
      const { username } = req.params;
      const user = await getUserPic(username);
      res.json(user.image);
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
};
