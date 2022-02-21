const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/dist`));

app.use(fallback(`${__dirname}/dist/index.html`));

app.listen(process.env.PORT || 8081);