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
    allowNull: false
  }
});

// Fonctions CRUD pour task
function getAllTasks() {
  return Task.findAll();
}

function getTaskById(id) {
  return Task.findByPk(id);
}

function addTask(task) {
  return Task.create({ task });
}

function updateTask(id, task) {
  return Task.update({ task }, { where: { id } });
}

function deleteTask(id) {
  return Task.destroy({ where: { id } });
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };

