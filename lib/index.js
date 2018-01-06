import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
//import schema from './schema/schema';
import bodyParser from 'body-parser';
import cryptoInfo from '../schema';
import axios from 'axios';
import cors from 'cors';
import controller from '../data/index';
import { express as middleware } from 'graphql-voyager/middleware';
const { makeExecutableSchema } = require('graphql-tools');
// Function that calls expres - Express is running!
const app = express();

const fetchData = controller();

  // The GraphQL schema in string form
  const typeDefs = cryptoInfo;
  
  const sources = ( ) => {
    return axios.get(`https://hackcoin-new.firebaseio.com/source.json`)
    .then( res => {
      const Values = Object.values(res.data)
    
      console.log(Values);
      
    });
  }

  // The resolvers
  const resolvers = {
	search: { source: () => [sources] }
  };
  
  // Put together a schema
  const schema = makeExecutableSchema({
	typeDefs,
	resolvers
  });

app.use('*', cors({ origin: 'http://localhost:8000' }));

app.use('/query', bodyParser.json(), graphqlExpress({ schema: schema }));

app.get('/graphql', graphiqlExpress({ endpointURL: '/query' })); // GUI Editor 

app.use('/voyager', middleware({ endpointUrl: '/query' }));

if (process.env.NODE_ENV === 'production') {
	//This will serve production React Enviroment

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Setting up heroku - Dynamic Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
