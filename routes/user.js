const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const profileController = require("../controllers/profile.js");
const authenticator = require("../middleware/auth.js");

//Sign up User
router.post("/signup", userController.signup);

//Sign in User
router.post("/signin", userController.signin);

//Create User Profile
router.post(
  "/create-profile",
  authenticator.auth,
  profileController.createProfile
);

//Edit User Profile
router.post("/edit-profile", authenticator.auth, profileController.editProfile);

//Get all User
router.get("/all-user", userController.getAllUser);

module.exports = router;
