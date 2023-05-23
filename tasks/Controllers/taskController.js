const express = require('express');
const taskService = require('../services/taskService');
const { authenticateToken } = require('../../auth/services/userService');

//const { authenticate } = require('../../auth/Controllers/loginController');

const router = express.Router();

const handleError= (res,error) => {
  console.log(error);
  res.status(500).send('Erreur interne du serveur');
};


router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.send(tasks);
  } catch (error) {
    handleError(res,error);
  }
});


router.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskService.getTaskById(id);
    res.send(task);
  } catch (error) {
    handleError(res,error);
  }
});

// router.post('/tasks', async (req, res) => {
//   const task = req.body.task;
//   try {
//     const message = await taskService.addTask(task);
//     res.send(message);
//   } catch (error) {
//     handleError(res,error);
//   }
// });

// router.post('/tasks', async (req, res) => {
//   const task = req.body.task;
//   const userId = req.user; // Obtenez l'ID de l'utilisateur à partir du middleware d'authentification
//   try {
//     const message = await taskService.addTask(task, userId);
//     res.send(message);
//   } catch (error) {
//     handleError(res, error);
//   }
// });

router.post('/tasks', async (req, res) => {
  const task = req.body.task;
  const token = req.headers.authorization;
  
  try {
    const userId =await authenticateToken(token); // Récupérer l'ID de l'utilisateur à partir du jeton
    await taskService.addTask(task, userId);
    res.send('Tâche ajoutée avec succès.'+ userId );
  } catch (error) {
    handleError(res, error);
  }
});

router.put('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const task = req.body.task;
    try {
        const message = await taskService.updateTask(id, task);
        res.send(message);
    } catch (error) {
        handleError(res,error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const message = await taskService.deleteTask(id);
        //res.status(200).send("Tâche supprimée avec succès !");
        res.send(message);
    } catch (error) {
        handleError(res,error);
    }
});

module.exports = {router};
    
//module.exports = router;