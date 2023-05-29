const Sequelize = require('sequelize');
const { connectDB } = require('../../config/db');

// Initialisation de la connexion avec la base de données
const sequelize = connectDB();
// creation du model
const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task: {
    type: Sequelize.STRING,
    allowNull: true
  },
  user: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Task;

