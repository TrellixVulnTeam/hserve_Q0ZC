'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _index = require('../data/index');

var _index2 = _interopRequireDefault(_index);

var _middleware = require('graphql-voyager/middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import schema from './schema/schema';
var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;
// Function that calls expres - Express is running!


var app = (0, _express2.default)();

var fetchData = (0, _index2.default)();

// The GraphQL schema in string form
var typeDefs = _schema2.default;

var Find_Coin_Profiles = function Find_Coin_Profiles() {
  console.log('test resolver');
};

// The resolvers
var resolvers = {
  all_queries: { cryptoProfiles: function cryptoProfiles() {
      return [Find_Coin_Profiles];
    } }
};

// Put together a schema
var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

app.use('*', (0, _cors2.default)({ origin: 'http://localhost:8000' }));

app.use('/query', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: schema }));

app.get('/graphql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/query' })); // GUI Editor 

app.use('/voyager', (0, _middleware.express)({ endpointUrl: '/query' }));

if (process.env.NODE_ENV === 'production') {
  //This will serve production React Enviroment

  app.use(_express2.default.static('client/build'));

  var path = require('path');
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Setting up heroku - Dynamic Binding
var PORT = process.env.PORT || 5000;
app.listen(PORT);