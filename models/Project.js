const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const slug = require('slug');
const shortid = require('shortid');



const sequelize = require('../config/db');

class Project extends Model { }
Project.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
  }
}, {
    hooks: {
      beforeCreate(project) {
        const url = slug(project.projectName).toLocaleLowerCase();
        project.url = `${url}-${shortid.generate()}`;
      }
    },
    sequelize,
    modelName: 'project'
    // options
  });

module.exports = Project;