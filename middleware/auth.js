const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    const userID = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, result) => {
        if (result) {
          return result;
        } else {
          console.log(err);
        }
      }
    );
    // console.log(userID, "user id");

    if (userID) {
      User.findByPk(userID)
        .then((user) => {
          //   console.log(JSON.stringify(user));
          req.user = user;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ success: false, message: "Try Again" });
        });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Incorrect Credentails" });
    }
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    };
  }
};
