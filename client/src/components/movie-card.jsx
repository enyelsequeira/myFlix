import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card bg="primary" text="white" style={{ width: "18rem" }}>
        {" "}
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="success">
            view more
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImageUrl: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

/*export const MovieCard = ({ movie, onMovieClick }) => (
    <div onClick={() => onMovieClick(movie)} className="movie-card">
      {movie.Title}
    </div>
  );
*/
