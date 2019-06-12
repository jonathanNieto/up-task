const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

/* referencia al modelo donde vamos a autenticar */
const User = require('../models/User');

/* local strategy - Login con credenciales propias (email y password) */
passport.use(
    new LocalStrategy(
        {
            /* por default passport espera un username y un password, pero podemos cambiar ese comportamiento */
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, {
                        message: 'Usuario y/o contraseña no son validos'
                    });
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false, {
                        message: 'Usuario y/o contraseña no son validos'
                    });
                }
                return done(null, user);
            } catch (error) {
                /* no existe el user */
                return done(null, false, {
                    message: 'It was an error: ' + error
                });
            }
        }
    )
);

/* serializar el usuario */
passport.serializeUser((user, callback) => {
    callback(null, user);
});

/* deserializar el usuario */
passport.deserializeUser((user, callback) => {
    callback(null, user);
});

module.exports = passport;