const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require( 'apollo-server-express' );
const typeDefs = require('./schemas/typedef');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Authentication
});

const app = express();
const PORT = process.env.PORT || 3001;

// To connect Express App to Apollo
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  console.log(`Use GraphQL at http://localhost:${port}${server.graphqlPath}`);

  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
