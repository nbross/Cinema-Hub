const { Schema } = require('mongoose');

// This is a sub-document schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema({
  overview: {
    type: String,
    required: true,
  },
  // saved movie id from movie db
  movieId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  release: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;
