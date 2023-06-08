const express = require('express');
const taskService = require('../services/taskService');
const { authenticateToken,authenticate } = require('../Services/authService');
const { body, validationResult } = require('express-validator');


const router = express.Router();

const handleError= (res,error) => {
  console.log(error);
  res.status(500).send('Erreur interne du serveur');
};


router.get('/tasks',authenticate, async (req, res) => {
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


router.post('/tasks',authenticate,[
  body('task').notEmpty().withMessage('Le champ task est requis')
], async (req, res) => {
  const task = req.body.task;
  const token = req.headers.authorization;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const userId =await authenticateToken(token);
    //console.log(userId) // Récupérer l'ID de l'utilisateur à partir du jeton
    await taskService.addTask(task, userId);
    res.send('Tâche ajoutée avec succès.' );
  } catch (error) {
    handleError(res, error);
  }
});


router.put('/tasks/:id',authenticate ,[
  body('task').notEmpty().withMessage('Le champ task est requis')
], async (req, res) => {
    const id = req.params.id;
    const task = req.body.task;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await taskService.updateTask(id, task);
        res.send('Tâche modifiée avec succès.' );
    } catch (error) {
        handleError(res,error);
    }
});

router.delete('/tasks/:id',authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const message = await taskService.deleteTask(id);
        //res.status(200).send("Tâche supprimée avec succès !");
        res.send('Tâche supprimé avec succès.' );
    } catch (error) {
        handleError(res,error);
    }
});

module.exports = {router};
    
//module.exports = router;