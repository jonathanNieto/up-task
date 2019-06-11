const Task = require('../models/Task');
const Project = require('../models/Project');

exports.newTask = async (req, res, next) => {
    /* get current project */
    const project = await Project.findOne({
        where:{
            url: req.params.url
        }
    });

    /* get value from input */
    const { task } = req.body;
    
    /* estado 0 = incompleto y el ID */
    const state = 0;
    const projectId = project.id;

    /* validar que tengamos algo en el input:  es una validacion muy sencilla */
    let errors = [];
    if (!task) {
        errors.push({ text: 'El nombre de la tarea es requerida' })
    }

    /* si hay errores */
    if (errors.length > 0) {
        res.render('tasks', { pagename: 'Nueva tarea', errors, projects });
    } else {
        /* no hay errores: creating a new task */
        const result = await Task.create({ task, state, projectId });

        if (!result) {
            return next();
        } else {
            setTimeout(() => {
                res.redirect(`/project/${req.params.url}`);
            }, 1500);
        }
    }
}