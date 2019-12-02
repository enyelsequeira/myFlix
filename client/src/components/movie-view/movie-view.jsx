import React from "react";

import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MovieView = ({ movie, onButtonClick }) => {
  if (!movie) return null;

  return (
    <CardColumns>
      <Card border="danger" style={{ widht: "18rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          {console.log(movie.Director.Name, movie.Director.Bio)}
          <Card.Title>Movie Title: {movie.Title}</Card.Title>
          <Card.Text>Movie Genre: {movie.Genre.Name}</Card.Text>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Card.Text>Movie Director: {movie.Director.Name}</Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Card.Text>Director Bio: {movie.Director.Bio}</Card.Text>
          <Button
            variant="primary"
            className="homeButton"
            onClick={() => onButtonClick()}
          >
            Go back
          </Button>
        </Card.Body>
      </Card>
    </CardColumns>
  );
};

export default MovieView;

/*import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie, goBack } = this.props;

    if (!movie) return null;

    retun(
      <Card style={{ widht: "18rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>Movie Title: {movie.Title}</Card.Title>
          <Card.Text>Movie Genre: {movie.Genre.Name}</Card.Text>
          <Card.Text>Movie Director: {movie.Director.Name}</Card.Text>
          <Card.Text>Director Bio: {movie.Director.Bio}</Card.Text>
          <Button
            variant="primary"
            onClick={() => onMovieClick()}
            className="homeButton"
          >
            Go back
          </Button>
        </Card.Body>
      </Card>
    );

    /*return (
      <div className="movie-view">
        <div className="movie-tittle">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <button onClick={() => goBack()} className="back-button">
          Back
        </button>
      </div>
    );
  }
}
*/
