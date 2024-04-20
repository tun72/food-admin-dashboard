const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

router.get("", authController.protect, userController.getUser);
router.route("/edit-user").post(authController.protect, userController.postEditUser);
router.route("/edit-password").post(authController.protect, userController.postEdiPassword);

module.exports = router;