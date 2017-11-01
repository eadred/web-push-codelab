'use strict';

// Public: BE_hzdgC6WkehS9oLdN7dFhfpCeGuF64trYt0OkQfBqJm1yeIlCKcb2BOWYi2zLjOH7lTOU18y88Z8QIymU2EJE
// Private: zxaWP-UVpi6ywpYb9aIuW7Bu1-SKKcPM_7WJOBfX-vM

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