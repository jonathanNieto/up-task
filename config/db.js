const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('uptasknode', 'root', 'Toor@1984', {
    host: 'localhost',
    dialect: 'mariadb',
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
    },
    dialectOptions: {
        useUTC: true,
        timezone: process.env.db_timezone
    },
});

module.exports = sequelize;