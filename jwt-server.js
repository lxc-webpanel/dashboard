var express = require('express')
  , jwtMiddleware = require('express-jwt')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , cors = require('cors');

var jwt = require('jsonwebtoken');

// We pass a secret token into the NodeJS process via an environment variable.
// We will use this token to sign cookies and JWTs
var SECRET_TOKEN = process.env.SECRET_TOKEN || 'kfQRlGjUxB7JrWcMC/fuDQP2jncy7yWFTFC0HdKW';

// Create the app server
var app = express();

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors());

// For each request, parse request body into a JavaScript object where header Content-Type is application/json
app.use(bodyParser.json());

// For each request, parse cookies
app.use(cookieParser());

app.post('/login', (req, res) => {
  var username = req.body.username
    , password = req.body.password;

  console.log(username, password);

  // Some how get the user.
  // This doesn't have to be sync... you could write the token gen and response in a callback
  var user = {
    _id: 1,
    username: 'admin'
  };

  // https://github.com/auth0/node-jsonwebtoken
  // Using SECRET_TOKEN, create a token string that contains the user's _id from the database.
  var token = jwt.sign(user, SECRET_TOKEN, {
    expiresIn: '1m'
  });

  // Send the response with 200 status code (ok) and the user object + the token
  // The client will send the token with every future request
  // against secured API endpoints.
  res.status(200).send({
    token: token
  });
});

// https://github.com/auth0/express-jwt
// Secure "protected" endpoints with JWT middleware
app.use('/protected', jwtMiddleware({
  secret: SECRET_TOKEN, // Use the same token that we used to sign the JWT above
  // Let's allow our clients to provide the token in a variety of ways
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
    return null;
  }
}));

// A simple protected route for demo purposes
app.get('/protected/data', function (req, res) {
  console.log(req.user); // => { _id: <Some ID attached to the JWT signed in the login route above> }

  res.status(200).send({
    text: 'Hello world!'
  })
});

app.listen(5000); // Listen on port 80