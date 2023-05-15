const express = require('express');
const userService = require('../services/loginService');


const router = express.Router();

const handleError= (res,error) => {
  console.log(error);
  res.status(500).send(error);
};

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (isValidCredentials(username, password)) {
    const token = generateAuthToken(username);

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Informations d\'identification invalides' });
  }
});

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Jeton d\'authentification manquant' });
  }

  try {
    const decoded = verifyAuthToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Jeton d\'authentification invalide' });
  }
}



module.exports = {router};
    
//module.exports = router;