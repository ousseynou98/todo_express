const express = require('express');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, profil } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.addUser(username, hashedPassword, email, profil);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement de l\'utilisateur.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const isValid = await userService.isValidCredentials(username, password);

    if (!isValid) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    const token = userService.generateAuthToken();

    res.json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion de l\'utilisateur.' });
  }
});

module.exports = { router };
