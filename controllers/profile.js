const Profile = require("../models/profile.js");

// Create profile
exports.createProfile = async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const jobProfile = req.body.jobProfile;
  if (!name || !age || !jobProfile) {
    res
      .status(400)
      .json({ success: false, messgae: "Fill all the credentails" });
  }
  try {
    let profile = await req.user.createProfile({
      name,
      age,
      jobProfile,
    });

    res
      .status(200)
      .json({ success: true, message: "Profile Created", profile });
  } catch (error) {
    res.status(404).json({ success: false, message: "Please Try Again !!!" });
  }
};

// Edit profile
exports.editProfile = async (req, res) => {
  let updatedName = req.body.name;
  let updatedAge = req.body.age;
  let updatedJobProfile = req.body.jobProfile;

  try {
    let profile = await Profile.findOne({
      where: { userId: req.user.dataValues.id },
    });
    if (!profile) {
      res.status(404).json({ message: "User Profile Not Found" });
    }
    profile.name = updatedName;
    profile.age = updatedAge;
    profile.jobProfile = updatedJobProfile;

    await profile.save();

    res.status(200).json({ message: "Profile Updated", profile });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
