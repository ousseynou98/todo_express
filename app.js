const express = require('express');
const bodyParser = require('body-parser');
//const taskController = require('./tasks/Controllers/taskController');
const taskRouter = require('./tasks/Controllers/taskController').router;
const userRouter = require('./users/Controllers/userController').router;


const app = express();

app.use(bodyParser.json());

app.use(taskRouter);
app.use(userRouter);

app.listen(3000, () => console.log('Server started on port 3000'));