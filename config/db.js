const Sequelize = require('sequelize');

// Configuration bd
function connectDB() {

    const sequelize = new Sequelize('express', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql'
      });
      
    return sequelize ;
    
}

module.exports={connectDB};






// sequelize.sync().then(() => {
//   console.log('La base de données a été synchronisée avec succès !');
// }).catch((error) => {
//   console.error('Erreur de synchronisation de la base de données :', error);
// });
