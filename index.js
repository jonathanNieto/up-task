const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

/* helpers con algunas funciones utiles */
const helpers = require('./helpers');

/* crear la conexion a la bd */
const sequelize = require('./config/db');

/* importar lo modelos */
require('./models/Project');
require('./models/Task');
require('./models/User');

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

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/* agregamos express validator a toda la aplicacion */
app.use(expressValidator());

/* donde cargar los archivos estaticos | load static files*/
app.use(express.static('public'));

/* habilitando view engine | load View Engine */
app.set('view engine', 'pug');

/* añadir la carpeta de las vistas */
app.set('views', path.join(__dirname, './views'));

/* agregar flash messages */
app.use(flash());

/* cookie parser */
app.use(cookieParser());

/* sesiones nos permiten navegar entre distintas paginas
    sin volvernos a auntenticar
*/
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  /* cookie: { secure: true } */
}));

app.use(passport.initialize());
app.use(passport.session());

/* pasar 'vardump' a la app */
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  next();
});

/* usando las rutas */
app.use('/', routes());

/* Start server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));