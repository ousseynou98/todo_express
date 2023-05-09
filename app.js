// Importer les bibliothèques et fichiers nécessaires
const express = require('express');
const bodyParser = require('body-parser');
//const taskController = require('./tasks/Controllers/taskController');
const taskRouter = require('./tasks/Controllers/taskController').router;


// Créer une instance d'application express
const app = express();

// Configurer bodyParser pour traiter les requêtes avec un contenu JSON
app.use(bodyParser.json());

// Configurer les routes pour les méthodes HTTP GET, POST, PUT et DELETE
// app.get('/tasks', taskController.getAllTasks);
// app.get('/tasks/:id', taskController.getTaskById);
// app.post('/tasks', taskController.addTask);
// app.put('/tasks/:id', taskController.updateTask);
// app.delete('/tasks/:id', taskController.deleteTask);
app.use(taskRouter);

// Démarrer le serveur en écoutant les requêtes entrantes sur le port 3000
app.listen(3000, () => console.log('Server started on port 3000'));