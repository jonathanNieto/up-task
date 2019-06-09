const express = require('express');
const router = express.Router();

module.exports = () => {
    /* ruta para el home */
    router.get('/', (req, res) => {
        res.send('Index');
    });

    router.get('/about', (req, res) => {
        res.send('About us');
    });

    return router;
}