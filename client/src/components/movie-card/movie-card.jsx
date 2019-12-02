import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import "./movie-card.scss";

import { Link } from "react-router-dom";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <CardColumns>
        <Card bg="primary" text="warning" style={{ width: "18rem" }}>
          {" "}
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="info">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardColumns>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImageUrl: PropTypes.string
  }).isRequired
};

/*export const MovieCard = ({ movie, onMovieClick }) => (
    <div onClick={() => onMovieClick(movie)} className="movie-card">
      {movie.Title}
    </div>
  );
*/

export default MovieCard;
