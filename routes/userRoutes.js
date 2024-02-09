const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");


//get params val
// router.param("id", userController.checkID);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(authController.protect,authController.restrictTo(["admin"]), userController.getAllUsers)

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.protect,userController.updateUser)
  .delete(authController.protect,authController.restrictTo(["admin"]),userController.deleteUser);

module.exports = router;
