const express = require('express');
const router = express.Router();

/* importar express validator */
const { body } = require('express-validator/check');

/* importar controladores */
const projectsController = require('../controllers/projectsController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userContoller');
const authController = require('../controllers/authController');

module.exports = () => {
    /* ruta para el home */
    /* usamos el middleware authController.authenticatedUser para proteger nuestras tutas */
    router.get('/', authController.authenticatedUser, projectsController.home);

    /* form project */
    router.get('/new-project', authController.authenticatedUser, projectsController.formProject);
    /* new project */
    router.post('/new-project', authController.authenticatedUser,
        body('projectName').not().isEmpty().trim().escape(),
        projectsController.newProject);
    /* listar proyectos */
    router.get('/project/:url', authController.authenticatedUser, projectsController.projectByUrl);
    /* editar proyectos */
    router.get('/project/edit/:id', authController.authenticatedUser, projectsController.editProject);
    router.post('/new-project/:id', authController.authenticatedUser,
        body('projectName').not().isEmpty().trim().escape(),
        projectsController.updateProject);

    /* delete project */
    router.delete('/project/:url', authController.authenticatedUser, projectsController.deleteProject);


    /* routes for tasks */
    /* new task */
    router.post('/project/:url', authController.authenticatedUser, taskController.newTask);

    /* update task using patch */
    router.patch('/task/:id', authController.authenticatedUser, taskController.changeState);

    /* delete task */
    router.delete('/task/:id', authController.authenticatedUser, taskController.deleteTask);

    /* routes for users */
    /* create user account */
    router.get('/new-user-account', userController.newUserAccount);
    router.post('/new-user-account', userController.createUserAccount);

    /* login */
    router.get('/login', userController.formLogin);
    router.post('/login', authController.userAuthentication);

    /* logout */
    router.get('/logout', authController.logout);

    return router;
}