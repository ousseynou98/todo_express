const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configuration base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'express'
});

// Connexion à la base de données MySQL
connection.connect(function(error) {
  if (error) throw error;
  console.log('Connecté à la base de données MySQL !');
});

// Configuration de body-parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Récupération de toutes les tâches
app.get('/tasks', function(req, res) {
  connection.query('SELECT * FROM tasks', function(error, results) {
    if (error) throw error;
    res.send(results);
  });
});

// Récupération task avec id 
app.get('/tasks/:id', function(req, res) {
  connection.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], function(error, results) {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Ajout task
app.post('/tasks', function(req, res) {
  const task = req.body.task;
  connection.query('INSERT INTO tasks (task) VALUES (?)', [task], function(error, results) {
    if (error) throw error;
    res.send('Tâche ajoutée avec succès !');
  });
});

// Mise à jour task
app.put('/tasks/:id', function(req, res) {
  const task = req.body.task;
  const id = req.params.id;
  connection.query('UPDATE tasks SET task = ? WHERE id = ?', [task, id], function(error, results) {
    if (error) throw error;
    res.send('Tâche mise à jour avec succès !');
  });
});

// Suppression task
app.delete('/tasks/:id', function(req, res) {
  const id = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], function(error, results) {
    if (error) throw error;
    res.send('Tâche supprimée avec succès !');
  });
});


app.listen(port, function() {
  console.log('Le serveur a démarré sur le port ' + port);
});
