const express = require('express');
const router = express.Router();

/* importar express validator */
const { body } = require('express-validator/check');

/* importar controladores */
const projectsController = require('../controllers/projectsController');
const taskController = require('../controllers/taskController');

module.exports = () => {
    /* ruta para el home */
    router.get('/', projectsController.home);

    /* form project */
    router.get('/new-project', projectsController.formProject);
    /* new project */
    router.post('/new-project',
        body('projectName').not().isEmpty().trim().escape(),
        projectsController.newProject);
    /* listar proyectos */
    router.get('/project/:url', projectsController.projectByUrl);
    /* editar proyectos */
    router.get('/project/edit/:id', projectsController.editProject);
    router.post('/new-project/:id',
        body('projectName').not().isEmpty().trim().escape(),
        projectsController.updateProject);

    /* delete project */
    router.delete('/project/:url', projectsController.deleteProject);


    /* routes for tasks */
    /* new task */
    router.post('/project/:url', taskController.newTask);
    
    return router;
}