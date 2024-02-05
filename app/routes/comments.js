const controller = require("../controllers/comments");
const router = require("express").Router();

router.get("/getcomments/:id", controller.getComments);

router.post("/", controller.createComment);

router.delete("/delete/:id", controller.deleteComment);
router.delete("/delete/:postid", controller.deletebyPostid);

module.exports = router;
