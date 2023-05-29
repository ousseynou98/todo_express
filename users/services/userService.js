const User = require('../models/user');

function getAllUsers() {
  return User.findAll();
}

function getUserById(id) {
  return User.findByPk(id);
}

async function addUser(username,password,email,profil) {

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }]
    }
  });

  if (existingUser) {
    throw new Error('Cet utilisateur existe déjà');
   
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({username,password: hashedPassword,email,profil});
}

function updateUser(id,username,email,profil) {
  return User.update({ username,email,profil}, { where: { id } });
}

function deleteUser(id) {
  return User.destroy({ where: { id } });
}

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
