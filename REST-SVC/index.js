const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.get('/api/widgets', function(req, res) {
  res.json([
    { name: 'widget 1', color: 'blue', size: 'large', quantity: 3},
    { name: 'widget 2', color: 'red', size: 'medium', quantity: 5},
    { name: 'widget 3', color: 'orange', size: 'small', quantity: 15},
  ]);
})

server.listen(3000, function() {
  console.log('rest service running on post 3000');
});
