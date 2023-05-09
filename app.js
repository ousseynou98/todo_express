const express = require('express');
const bodyParser = require('body-parser');
//const taskController = require('./tasks/Controllers/taskController');
const taskRouter = require('./tasks/Controllers/taskController').router;


const app = express();

app.use(bodyParser.json());

app.use(taskRouter);

app.listen(3000, () => console.log('Server started on port 3000'));