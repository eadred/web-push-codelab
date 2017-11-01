'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpush = require('./webpush')();

const PORT = 8888;

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
    res.redirect('/index.html');
  });

app.post('/subscribe', function(req, res) {
  console.log('Subscribing', req.body);
  webpush.subscribe(req.body);
  res.status(200).json({subscribed:true});
});

app.post('/unsubscribe', function(req, res) {
  console.log('Unsubscribing');
  webpush.unsubscribe();
  res.status(200).json({subscribed:false});
});

app.post('/notify', function(req, res) {
  console.log('Notifying', req.body);
  webpush.notify(req.body.payload);
  res.status(200).end();
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});