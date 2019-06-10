exports.home = (req, res) => {
    res.render('index', {pagename: 'Proyectos'});
}

exports.formProject = (req, res) => {
    res.render('newProject', {pagename: 'Nuevo Proyecto'});
}

exports.newProject = (req, res) => {
    /* enviar a la consola lo que el usuario escriba */
    /* console.log(req.body); */
    /* validar que tengamos algo en el input */
    const { nameProject } = req.body;
    let errors = [];
    if (!nameProject) {
        errors.push({ text: 'El nombre del proyecto es requerido'})
    } 

    /* si hay errores */
    if (errors.length > 0) {
        res.render('newProject', {pagename: 'Nuevo Proyecto', errors});
    } else {
        /* no hay errores */
    }
}
