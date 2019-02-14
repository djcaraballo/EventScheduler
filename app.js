const express = require('express');
const bodyParser = requre('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(4000);
