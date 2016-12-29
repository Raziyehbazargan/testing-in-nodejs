
const fs = require('fs');

const options = JSON.parse(fs.readFileSync('package.json'));

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//invoke express - because express is a function object
const app = express();

const server = http.createServer(app);

app.use('/demo/:id', function(req, res) {
  res.send('params:' + JSON.stringify(req.params) +
          '<b>query: ' + JSON.stringify(req.query));
});

app.use('/contact', bodyParser.urlencoded({ extended: true }));
app.use('/contact', bodyParser.json());

app.use('/contact', function(req, res) {
  res.send('POST Data: ', JSON.stringify(req.body));
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
