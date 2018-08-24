const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
// Mock data
const monsters = require('./database.json');

const typeDefs = `
  type Monster { id: Int, name: String, img_src: String }
  type Query {
    monsters: [Monster]
    monster(id: Int): Monster
    maxMonsterId: Int
  }
`;

const resolvers = {
  Query: {
    monsters: () => monsters,
    monster: (obj, args, context, info) => _.find(monsters, { id: args.id }),
    maxMonsterId: () => _.max(_.map(monsters, m => m.id))
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  cors: false
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
