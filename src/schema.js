const { gql } = require("apollo-server");

const typeDefs = gql`
  type Tags {
    name: String
  }
  type Comments {
    user: String
    comment: String
    date: String
  }

  type Article {
    user: ID!
    image: String
    title: String
    text: String
    tags: [Tags]
    comments: [Comments]
  }

  type User {
    _id: ID!
    name: String!
    image: String!
    email: String!
    password: String!
    role: String!
  }
  type Tokens {
    accessToken: String
    refreshToken: String
  }
  
  type Query {
    users: [User]
    articles: [Article]
  }

  type Mutation {
    registerUser(newUser: UserInput!): Tokens
    login(email: String!, password: String!):Tokens
  }

  input UserInput {
    name: String!
    email: String!
    image: String
    password: String!
    role: String
  }


`;
module.exports = typeDefs;
