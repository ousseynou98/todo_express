const express = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');
const { authenticateToken, authenticate } = require('../services/authService');


const router = express.Router();

const handleError = (res, error) => {
  console.log(error);
  res.status(500).send(error);
};

router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/users/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.send(user);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/users', authenticate, [
  body('username').notEmpty().withMessage('Le champ "username" est requis'),
  body('password').notEmpty().withMessage('Le champ "password" est requis'),
  body('email').notEmpty().withMessage('Le champ "email" est requis').isEmail().withMessage('Le champ "email" doit être une adresse email valide'),
  body('profil').notEmpty().withMessage('Le champ "profil" est requis')
], async (req, res) => {
  const { username, password, email, profil } = req.body;

  // Vérifier les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const message = await userService.addUser(username, password, email, profil);
    res.send(message);
  } catch (error) {
    handleError(res, error);
  }
});

router.put('/users/:id', authenticate, [
  body('username').notEmpty().withMessage('Le champ "username" est requis'),
  body('email').notEmpty().withMessage('Le champ "email" est requis').isEmail().withMessage('Le champ "email" doit être une adresse email valide'),
  body('profil').notEmpty().withMessage('Le champ "profil" est requis')
], async (req, res) => {
  const id = req.params.id;
  const { username, email, profil } = req.body;

  // Vérifier les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const message = await userService.updateUser(id, username, email, profil);
    res.send(message);
  } catch (error) {
    handleError(res, error);
  }
});

router.delete('/users/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const message = await userService.deleteUser(id);
    res.send(message);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = { router };
