const express = require('express');
const userService = require('../services/userService');


const router = express.Router();

const handleError= (res,error) => {
  console.log(error);
  res.status(500).send(error);
};

router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    handleError(res,error);
  }
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.send(user);
  } catch (error) {
    handleError(res,error);
  }
});

router.post('/users', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const profil = req.body.profil;
  try {
    const message = await userService.addUser(username,password,email,profil);
    res.send(message);
  } catch (error) {
    handleError(res,error);
  }
});

router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    const profil = req.body.profil;
    try {
        const message = await userService.updateUser(id, username,email,profil);
        res.send(message);
    } catch (error) {
        handleError(res,error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const message = await userService.deleteUser(id);
        //res.status(200).send("Tâche supprimée avec succès !");
        res.send(message);
    } catch (error) {
        handleError(res,error);
    }
});

module.exports = {router};
    
//module.exports = router;