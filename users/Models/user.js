const Sequelize = require('sequelize');
const { connectDB } = require('../../config/db');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

// Initialisation de la connexion avec la base de données
const sequelize = connectDB();
// creation du model
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


module.exports = User;

