'use strict';

const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');

const options = JSON.parse(fs.readFileSync('package.json'));
//invoke express - because express is a function object
const app = express();
const server = http.createServer(app);
const db = require('./database');

passport.use(new LocalStrategy({
  //these ( username, password) correspond to the actual names of the fields on the HTML
  usernameField: 'username',
  passwortField: 'password'
}, function(username, password, done) {
  if (db.authenticate(username, password)) {
    done(null, {
      username: username
    });
  } else {
    done(null, false);
  }
}));

//this allows us to have a value-key pair
const sessions = new Map();
passport.serializeUser(function(user, callback) {
  sessions.set(user.username, user);
  callback(null, user.username);
});

passport.deserializeUser(function(username, callback) {
  callback(null, sessions.get(username));
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//configue session data by express
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: 'secret'
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'www', 'login.html'));
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));

//general purpose handler, check if user logged in
app.use(function(req, res, next) {
  if(!req.user) {
    res.redirect('/login');
    return;
  }
  next();
});

app.use('/demo/:id', function(req, res) {
  res.send('params:' + JSON.stringify(req.params) +
          '<b>query: ' + JSON.stringify(req.query));
});

app.use('/contact', bodyParser.urlencoded({ extended: true }));
app.use('/contact', bodyParser.json());

app.use('/contact', function(req, res) {
  res.send('POST Data: ', JSON.stringify(req.body));
});

app.use(function(req, res, next) {
  console.log(req.cookies);
  res.cookie('demo', 'test');
  next();
});

app.get('/demo', function(req, res, next) {
  console.log('handled demo request1');
  req.body = 'demo test';
  next();
});

app.get('/demo', function(req, res) {
  console.log('handled demo request2');
  res.json({ msg: req.body });
});


//serve the static files - default file is index.html but we can add options and change defaults
app.use(express.static(options.webServer.folder, {
  index : 'index2.html',
  setHeaders: function( res, path, stat) {
    res.set('X-Custom-Header', 'My Express App');
  }
}));

server.listen(options.webServer.port, function() {
  console.log(`webserver started on port ${options.webServer.port}`)
})
