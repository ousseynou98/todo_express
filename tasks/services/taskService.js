const taskModel = require('../models/task');
const { authenticateToken } = require('../../auth/services/userService');
const Task = require('../models/task');


function getAllTasks() {
  return Task.findAll();
}

function getTaskById(id) {
  return Task.findByPk(id);
}

function addTask(task,user) {
  return Task.create({ task,user });
}

function updateTask(id, task) {
  return Task.update({ task }, { where: { id } });
}

function deleteTask(id) {
  return Task.destroy({ where: { id } });
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
