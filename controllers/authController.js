const passport = require('passport');

exports.userAuthentication = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequstMessage: 'E-mail y constraseña son obligatorios!'
});

/* funcion para revisar si el usuario esta autenticado o no */
exports.authenticatedUser = (req, res, next) => {
    /* si el usuario está autenticado, adelante */
    if (req.isAuthenticated()) {
        return next();
    }
    /* sí no está autenticado, redirigir al formulario */
    return res.redirect('login');
}

/* funcion para cerrar sesión */
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); /* al cerrar sesión nos lleva al login */
    })
}