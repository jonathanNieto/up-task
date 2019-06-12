const User = require('../models/User');

exports.newUserAccount = (req, res) => {
    res.render('createUserAccount', { pageName: 'Crear tu cuenta en Up Task' });
}

exports.formLogin = (req, res) => {
    const { error } = res.locals.messages;
    req.flash('danger', error);
    res.render('login', { pageName: 'Iniciar sesión en Up Task', messages: req.flash() });
}

exports.createUserAccount = async (req, res) => {
    /* get data */
    const { email, password } = req.body;

    try {
        /* create an user */
        await User.create({ email, password });
        res.redirect('/login');
    } catch (err) {
        req.flash('danger', err.errors.map(err => err.message));
        res.render('createUserAccount', {
            pageName: 'Crear tu cuenta en Up Task',
            messages: req.flash(),
            email
        });
    }
}