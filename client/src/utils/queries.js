import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedMovies {
        movieId
        image
        overview
        title
        release
      }
    }
  }
`;