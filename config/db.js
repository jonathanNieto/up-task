const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('uptasknode', 'root', 'Toor@1984', {
    host: 'localhost',
    dialect: 'mariadb',
    define: {
        timestamps: false
    },
    dialectOptions: {
        useUTC: true,
        timezone: process.env.db_timezone
    },
});

module.exports = sequelize;