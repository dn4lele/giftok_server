const { route } = require("..");
const controller = require("../controllers/users");
const router = require("express").Router();

router.get("/getusers/:name", controller.getUsers);
router.get("/getuserpicandname/:id", controller.getUserPic);
router.get("/", controller.getUser);
router.get("/getuser/:id", controller.getUserbyid);
router.get("/getmostfollowers/:id", controller.getmostfollowers);
router.get("/wasfollow/:follwer/:thefollow", controller.wasfollow);
router.get("/getfollowers/:id", controller.getfollowers);
router.get("/getfollowing/:id", controller.getfollowing);

router.post("/", controller.createUser);

router.patch("/update/:id", controller.updateUser);
router.patch("/follow/:follwer/:thefollow", controller.updateUserFollow);

router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
