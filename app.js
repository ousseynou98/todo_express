const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./Controllers/taskController').router;
const userRouter = require('./Controllers/userController').router;
const loginRouter = require('./Controllers/authController').router;
//const userService = require('./auth/services/userService');
const { authenticate } = require('./Services/authService');
const app = express();
//const session = require('express-session');

app.use(bodyParser.json());



app.use('/auth', loginRouter);
app.use(authenticate);


app.use(taskRouter);
app.use(userRouter);

app.listen(3000, () => console.log('Server started on port 3000'));