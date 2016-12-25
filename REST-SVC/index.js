const http = require('http');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const { strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const jwtOptions = {
  jwtRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'secret',
  algorithms: ['HS256']
};

passport.use(new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  done(null, {name: jwtPayload.name});
}));

const widgetRouter = require('./routers/widget')

const app = express();
const server = http.createServer(app);

app.use(passport.authenticate('jwt', { session: false}));
//on all requests to our API, we'll go ahead and just process the body.
//we actally make requests where the content-type is set to application JSON,
//Body parser is going to set up a property on teh request object called body.
//and we can access the aactual request body data on that property as a javascript object
app.use('/api', bodyParser.json());
app.use('/api', widgetRouter);

server.listen(3000, function() {
  console.log('rest service running on post 3000');
});
