import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);
  
  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;


  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId },
      });

      // upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData.username}'s saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
        {userData.savedMovies?.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? 'movie' : 'movies'
              }:`
            : 'You have no saved movies! 😔 ' }
        </h2>
        <CardColumns>
          {userData.savedMovies?.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w200${movie.image}`} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Release Date: {movie.release}</p>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;