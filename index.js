const { ApolloServer } = require("apollo-server");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/schema");





const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  server.listen().then(({ url }) => {
    console.log("server is ready at" + url);
  });