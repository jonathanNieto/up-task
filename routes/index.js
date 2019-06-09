const express = require('express');
const router = express.Router();

/* importar el controlador */
const projectsController = require('../controllers/projectsController');

module.exports = () => {
    /* ruta para el home */
    router.get('/', projectsController.home);

    router.get('/about', projectsController.about);

    return router;
}