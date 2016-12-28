
const fs = require('fs');

const options = JSON.parse(fs.readFileSync('package.json'));

const http = require('http');
const express = require('express');

//invoke express - because express is a function object
const app = express();

const server = http.createServer(app);

//serve the static files
app.use(express.static(options.webServer.folder));

server.listen(options.webServer.port, function() {
  console.log(`webserver started on port ${options.webServer.port}`)
})
