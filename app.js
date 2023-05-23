// const express = require('express');
// const bodyParser = require('body-parser');
// //const taskController = require('./tasks/Controllers/taskController');
// const taskRouter = require('./tasks/Controllers/taskController').router;
// const userRouter = require('./users/Controllers/userController').router;
// const loginRouter = require('./auth/Controllers/loginController').router;


// const app = express();

// app.use(bodyParser.json());

// app.use(taskRouter);
// app.use(userRouter);
// app.use(loginRouter);

// app.listen(3000, () => console.log('Server started on port 3000'));

const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./tasks/Controllers/taskController').router;
const userRouter = require('./users/Controllers/userController').router;
const loginRouter = require('./auth/Controllers/loginController').router;
const userService = require('./auth/services/userService');

const app = express();

app.use(bodyParser.json());

app.use('/auth', (req, res, next) => {
    next(); 
  });
  
app.use('/auth', loginRouter);


// Middleware d'authentification
app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    const userId = userService.authenticateToken(token);
    req.user = userId; 
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
//next();
});



app.use(taskRouter);
app.use(userRouter);

app.listen(3000, () => console.log('Server started on port 3000'));