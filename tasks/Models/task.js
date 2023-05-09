const Sequelize = require('sequelize');

// Configuration bd
const sequelize = new Sequelize('express', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

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


sequelize.sync().then(() => {
  console.log('La base de données a été synchronisée avec succès !');
}).catch((error) => {
  console.error('Erreur de synchronisation de la base de données :', error);
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

