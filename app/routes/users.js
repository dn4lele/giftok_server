const controller = require("../controllers/users");
const router = require("express").Router();

router.get("/", controller.getUser);
router.post("/", controller.createUser);

router.patch("/update/:id", controller.updateUser);
router.get("/getuserpic/:username", controller.getUserPic);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
