const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require("graphql-tools");

// Mock data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
    price: 2000
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000
  }
];

const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String, price: Int }
`;

const resolvers = {
  Query: { books: () => books }
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
