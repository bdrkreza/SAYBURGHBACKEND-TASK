const { ApolloServer } = require("apollo-server");
const { verify } = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./src/config/database");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/schema");
const validateTokensMiddleware = require("./src/middleware/authMiddleware");


require("dotenv").config();

connectMongoDB();

const app = express();

app.use(cookieParser());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

app.use(validateTokensMiddleware); // middleware to be built

server.listen().then(({ url }) => {
  console.log("server is ready at" + url);
});
