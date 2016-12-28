
const fs = require('fs');

const options = JSON.parse(fs.readFileSync('package.json'));

const http = require('http');
const express = require('express');

//invoke express - because express is a function object
const app = express();

const server = http.createServer(app);

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
