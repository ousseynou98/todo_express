const taskModel = require('../models/task');
const { authenticateToken } = require('../../auth/services/userService');

function getAllTasks() {
  return taskModel.getAllTasks();
}

function getTaskById(id) {
  return taskModel.getTaskById(id);
}

function addTask(task,userId) {
  return taskModel.addTask(task,userId);
}

function updateTask(id, task) {
  return taskModel.updateTask(id, task);
}

function deleteTask(id) {
  return taskModel.deleteTask(id);
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
