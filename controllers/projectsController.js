const Project = require('../models/Project');
const Task = require('../models/Task')

exports.home = async (req, res) => {
    const projects = await Project.findAll();
    res.render('index', { pagename: 'Proyectos', projects });
}

exports.formProject = async (req, res) => {
    const projects = await Project.findAll();
    res.render('newProject', { pagename: 'Nuevo Proyecto', projects });
}

exports.newProject = async (req, res) => {
    const projects = await Project.findAll();
    /* validar que tengamos algo en el input:  es una validacion muy sencilla */
    const { projectName } = req.body;
    let errors = [];
    if (!projectName) {
        errors.push({ text: 'El nombre del proyecto es requerido' })
    }

    /* si hay errores */
    if (errors.length > 0) {
        res.render('newProject', { pagename: 'Nuevo Proyecto', errors, projects });
    } else {
        /* no hay errores: creating a new project */
        await Project.create({ projectName });
        setTimeout(() => {
            res.redirect('/');
        }, 1500);

    }
}

exports.projectByUrl = async (req, res, next) => {
    const projectsPromise = Project.findAll();
    const projectPromise = Project.findOne({
        where: {
            url: req.params.url
        }
    });
    /* consultas que son independientes una de la otra, se pueden colocar en una promise */
    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    /* get tasks from current project */
    const tasks = await Task.findAll({
        where: {
            projectId: project.id
        },
        include: [
            { model: Project }
        ]
    });

    if (!project) {
        return next();
    }

    res.render('tasks', { pagename: 'Tareas del Proyecto', project, projects, tasks });
}

exports.editProject = async (req, res) => {
    const projectsPromise = Project.findAll();
    const projectPromise = Project.findOne({
        where: {
            id: req.params.id
        }
    });
    /* consultas que son independientes una de la otra, se pueden colocar en una promise */
    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    if (!project) {
        return next();
    }
    res.render('newProject', { pagename: 'Editar Proyecto', project, projects });
}

exports.updateProject = async (req, res) => {
    const projects = await Project.findAll();
    /* validar que tengamos algo en el input:  es una validacion muy sencilla */
    const { projectName } = req.body;
    let errors = [];
    if (!projectName) {
        errors.push({ text: 'El nombre del proyecto es requerido' })
    }

    /* si hay errores */
    if (errors.length > 0) {
        res.render('newProject', { pagename: 'Nuevo Proyecto', errors, projects });
    } else {
        /* no hay errores: creating a new project */
        await Project.update(
            { projectName },
            { where: { id: req.params.id } }
        );
        setTimeout(() => {
            res.redirect('/');
        }, 1500);

    }
}

exports.deleteProject = async (req, res, next) => {
    /* req, query o params */
    const { projectUrl } = req.query;

    const result = await Project.destroy({
        where: {
            url: projectUrl
        }
    });
    if (!result) {
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
}
