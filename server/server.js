const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
dotenv.config();

// Import our graph resolvers
var graph = require("./graph.js");
var resolvers = graph.resolvers;

// Import the graphql type definitions from the schema file
const { importSchema } = require("graphql-import");
const typeDefs = importSchema(`./server/schema.graphql`);

// Initialize the ApolloServer with the GraphQL type definitions and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// launch the web server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url} `);
});
