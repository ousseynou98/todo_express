// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../../config/jwt');

// function addUser(username, password, email, profil) {
//   return User.create({ username, password, email, profil });
// }

// async function isValidCredentials(username, password) {
//   const user = await User.findOne({ where: { username } });

//   if (!user) {
//     return false;
//   }

//   return user.comparePassword(password);
// }

// function generateAuthToken() {
//   const token = jwt.sign({ userId: this.id }, jwtSecret, { expiresIn: '1h' });
//   return token;
// }


// function authenticateToken(token) {
//   try {
//     const tokenWithoutPrefix = token.split(' ')[1]; 
//     //console.log("Token:", tokenWithoutPrefix);
//     const decodedToken = jwt.verify(tokenWithoutPrefix, jwtSecret);
//     console.log("User ID:", decodedToken.userId); 
//     return decodedToken.userId;
    
//   } catch (error) {
//     const errorMessage = `Invalid token: ${token}. Key used: ${jwtSecret}`;
//     throw new Error(errorMessage);
//   }
// }



// module.exports = { addUser, isValidCredentials, generateAuthToken,authenticateToken };

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/jwt');

function addUser(username, password, email, profil) {
  return User.create({ username, password, email, profil });
}

async function isValidCredentials(username, password) {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return false;
  }

  return user.comparePassword(password);
}

async function getUserByUsername(username) {
  return User.findOne({ where: { username } });
}

function generateAuthToken(userId) {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  return token;
}

function authenticateToken(token) {
  try {
    const tokenWithoutPrefix = token.split(' ')[1]; 
    const decodedToken = jwt.verify(tokenWithoutPrefix, jwtSecret);
    //console.log("User ID:", decodedToken.userId); 
    return decodedToken.userId;
  } catch (error) {
    const errorMessage = `Invalid token: ${token}. Key used: ${jwtSecret}`;
    throw new Error(errorMessage);
  }
}

 function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }
  //console.log("toddddddddkeddn");
  try {
    const userId = authenticateToken(token);
    req.user = userId;
    //console.log("tokeddn");
    console.log(userId);
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}


module.exports = { addUser, isValidCredentials, generateAuthToken, authenticateToken,authenticate,getUserByUsername };

