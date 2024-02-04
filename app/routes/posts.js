const controller = require("../controllers/posts");
const router = require("express").Router();

router.get("/getgifs/:gifname", controller.getgifs);

router.post("/addpost", controller.createPost);

router.get("/getpost/paging/:page", controller.getPostsPaging);

router.get("/getpost/:username", controller.getuserposts);

router.patch("/addlike/:postid/:userid", controller.addlike);
router.get("/youliked/:postid/:userid", controller.youliked);

module.exports = router;
