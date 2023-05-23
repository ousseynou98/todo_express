const Sequelize = require('sequelize');
const { connectDB } = require('../../config/db');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

const sequelize = connectDB();

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profil: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User;
