const express = require("express")
const router = express.Router();
const {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
  } = require("../controller/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
