const express = require('express');
const routes = require('./routes');

/* crear una app de express */
const app = express();

const port = 3000;

/* usando las rutas */
app.use('/', routes());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));