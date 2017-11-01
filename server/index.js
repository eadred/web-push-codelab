'use strict';

const express = require('express');
const path = require('path');

const PORT = 8888;

const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
    res.redirect('/index.html');
  });

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});