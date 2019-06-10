const express = require('express');
const router = express.Router();

/* importar el controlador */
const projectsController = require('../controllers/projectsController');

module.exports = () => {
    /* ruta para el home */
    router.get('/', projectsController.home);
    
    /* form project */
    router.get('/new-project', projectsController.formProject);
    /* new project */
    router.post('/new-project', projectsController.newProject);
    

    return router;
}