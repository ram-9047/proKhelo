const Sequelize = require("sequelize");
const sequelize = require("../util/db.js");

const Profile = sequelize.define("Profile", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  jobProfile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Profile;
