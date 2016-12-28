const http = require('http');
const expressn = require('express');

//invoke express - because express is a function object
const app = express();

const server = http.createServer(app);

//serve the static files
app.use(express.static('www'));

server.listen(3000, function() {
  console.log('webserver started on port 3000.')
})
