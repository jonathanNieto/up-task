const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

/* helpers con algunas funciones utiles */
const helpers = require('./helpers');

/* crear la conexion a la bd */
const sequelize = require('./config/db');

/* importar lo modelos */
require('./models/Project');
require('./models/Task')

/* Testing the connection */
sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* crear una app de express | init app*/
const app = express();

/* set the port */
const port = 3000;

/* donde cargar los archivos estaticos | load static files*/
app.use(express.static('public'));

/* habilitando view engine | load View Engine */
app.set('view engine', 'pug');

/* añadir la carpeta de las vistas */
app.set('views', path.join(__dirname, './views'));

/* pasar 'vardump' a la app */
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/* usando las rutas */
app.use('/', routes());

/* Start server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));