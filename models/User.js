const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../config/db');
const Project = require('./Project');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class User extends Model { }
User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Escribe un e-mail valido"
            },            // checks for email format (foo@bar.com)
            notEmpty: {
                msg: 'El e-mail no puede estar vacío'
            }
        },
        unique: {
            args: true,
            msg: 'E-mail ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede estar vacío'
            }
        }
    }
},
    {
        hooks: {
            beforeCreate(user) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds));
            }
        },
        sequelize,
        modelName: 'user'
        // options
    });
    
/* metodos personalizados */
User.prototype.verifyPassword = function (pass) {
    return bcrypt.compareSync(pass, this.password);
}
/* User.hasMany(Project); */

module.exports = User;