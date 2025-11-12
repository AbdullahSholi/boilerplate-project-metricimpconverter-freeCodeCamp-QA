'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

fccTestingRoutes(app);

apiRoutes(app);  
    
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

let server;

function startServer() {
  server = app.listen(port, function () {
    console.log("Listening on port " + port);
    if(process.env.NODE_ENV==='test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch(e) {
            console.log('Tests are not valid:');
            console.error(e);
        }
      }, 1500);
    }
  }).on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      console.log('Port ' + port + ' is already in use');
    } else {
      console.error('Server error:', err);
    }
  });
  return server;
}

if (!module.parent || process.env.NODE_ENV === 'test') {
  startServer();
}

module.exports = app;
