const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../config/db');

class Project extends Model {}
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
  sequelize,
  modelName: 'project'
  // options
});