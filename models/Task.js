const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../config/db');
const Project = require('./Project')

class Task extends Model { }
Task.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  state: {
    type: Sequelize.INTEGER(1),
  }
},
  {
    sequelize,
    modelName: 'task'
    // options
  });

Task.belongsTo(Project);

module.exports = Task;