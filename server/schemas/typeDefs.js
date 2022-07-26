const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveMovie(movieData: MovieInput!): User
  removeMovie(movieId: ID!): User
}

type User {
    _id: ID!
    username: String!
    email: String!
    movieCount: Int
    savedMovies: [Movie]
  }

type Movie {
    movieId: ID!
    overview: String
    image: String
    release: String
    title: String
  }

input MovieInput {
    overview: String
    movieId: Int
    image: String
    release: String
    title: String
  }

type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;