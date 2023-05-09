const taskModel = require('../models/task');

function getAllTasks() {
  return taskModel.getAllTasks();
}

function getTaskById(id) {
  return taskModel.getTaskById(id);
}

function addTask(task) {
  return taskModel.addTask(task);
}

function updateTask(id, task) {
  return taskModel.updateTask(id, task);
}

function deleteTask(id) {
  return taskModel.deleteTask(id);
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
