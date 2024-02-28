const controller = require("../controllers/posts");
const router = require("express").Router();

router.get("/getgifs/:gifname", controller.getgifs);
router.get("/getpost/paging/:page", controller.getPostsPaging);
router.get("/youliked/:postid/:userid", controller.youliked);
router.get("/getpost/:username", controller.getuserposts);
router.get("/getpostbyname/:description", controller.getPosts);
router.get("/getpostbyradio/:radios/:yourposition", controller.getPostsByRadio);
router.get("/getpostbyuserid/:id", controller.getpostbyuserid);
router.get("/getmostliked/:id", controller.getmostliked);
router.get("/getpostbyid/:id", controller.getpostbyid);
router.get("/postwithmostcomments", controller.postwithmostcomments);

router.patch("/addlike/:postid/:userid", controller.addlike);

router.post("/addpost", controller.createPost);

router.delete("/delete/:id", controller.deletePost);

module.exports = router;
