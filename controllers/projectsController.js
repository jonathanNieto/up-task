const Project = require('../models/Project');

exports.home = (req, res) => {
    res.render('index', { pagename: 'Proyectos' });
}

exports.formProject = (req, res) => {
    res.render('newProject', { pagename: 'Nuevo Proyecto' });
}

exports.newProject = async (req, res) => {
    /* validar que tengamos algo en el input:  es una validacion muy sencilla */
    const { projectName } = req.body;
    let errors = [];
    if (!projectName) {
        errors.push({ text: 'El nombre del proyecto es requerido' })
    }

    /* si hay errores */
    if (errors.length > 0) {
        res.render('newProject', { pagename: 'Nuevo Proyecto', errors });
    } else {
        /* no hay errores: creating a new project */
        const project = await Project.create({ projectName });
        setTimeout(() => {
            res.redirect('/');
        }, 1500);
            
    }
}
