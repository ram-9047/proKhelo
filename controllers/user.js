const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRound = 10;

exports.signup = (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Fill all the credentials" });
  }

  bcrypt.genSalt(saltRound, (err, newSalt) => {
    bcrypt.hash(password, newSalt, async (err, newPassword) => {
      if (err) {
        // console.log(err, "err in line 15");
        res.status(500).json({ message: "Internal DB Error" });
      } else {
        try {
          let user = await User.create({
            email,
            password: newPassword,
          });
          res.status(200).json(user);
        } catch (error) {
          if (error.parent.errno == 1062) {
            res
              .status(400)
              .json({ success: false, message: "Email Already Exist" });
          }
          res
            .status(400)
            .json({ error, success: false, message: "Please Try Again" });
        }
      }
    });
  });
};

function generateToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.signin = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(404).json({ success: false, message: "Incorrect Credentails" });
  }

  try {
    User.findAll({ where: { email } }).then((user) => {
      if (user.length > 0) {
        bcrypt.compare(password, user[0].dataValues.password, (err, result) => {
          if (err) {
            // console.log(err, "error in comparing password");
            res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
          }
          if (result) {
            const userID = user[0].dataValues.id;
            const token = generateToken(userID);
            res
              .status(200)
              .json({ success: true, message: "Logged In !!!", token });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Password in Incorrect" });
          }
        });
      } else {
        console.log("user not found");
        res.status(404).json({ success: false, message: "User Not Found" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// All User
exports.getAllUser = async (req, res) => {
  try {
    let users = await User.findAll();
    console.log(users);
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "PLease Try Again" });
  }
};
