const express = require('express');
const router = express.Router();

/* importar express validator */
const {body} = require('express-validator/check');

/* importar el controlador */
const projectsController = require('../controllers/projectsController');

module.exports = () => {
    /* ruta para el home */
    router.get('/', projectsController.home);
    
    /* form project */
    router.get('/new-project', projectsController.formProject);
    /* new project */
    router.post('/new-project', 
        body('projectName').not().isEmpty().trim().escape(),
        projectsController.newProject);
    

    return router;
}