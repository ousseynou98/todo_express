const userModel = require('../models/user');

function getAllUsers() {
  return userModel.getAllUsers();
}

function getUserById(id) {
  return userModel.getUserById(id);
}

function addUser(username,password,email,profil) {
  return userModel.addUser(username,password,email,profil);
}

function updateUser(id, username,email,profil) {
  return userModel.updateUser(id, username,email,profil);
}

function deleteUser(id) {
  return userModel.deleteUser(id);
}

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
