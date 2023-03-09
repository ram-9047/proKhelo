const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();

// Database
const sequelize = require("./util/db.js");

// Models
const User = require("./models/user.js");
const Profile = require("./models/profile.js");

//Routes
const userRoutes = require("./routes/user.js");

app.use(bodyParser.json());

// Database Relationship
User.hasOne(Profile);
Profile.belongsTo(User);

app.use(userRoutes);

const port = 3000;

sequelize
  .sync()
    // .sync({ force: true })
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`server is started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err, "error in connecting db");
  });
