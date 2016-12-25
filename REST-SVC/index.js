const http = require('http');
const express = require('express');
const widgetRouter = require('./routers/widget')

const app = express();
const server = http.createServer(app);

app.use('/api', widgetRouter);

server.listen(3000, function() {
  console.log('rest service running on post 3000');
});
