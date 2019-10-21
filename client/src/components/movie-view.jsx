import React from "react";

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
          <Card.Title>Movie Title: {movie.title}</Card.Title>
          <Card.Text>Movie Genre: {movie.genre.name}</Card.Text>
          <Card.text>Movie Director: {movie.director.name}</Card.text>
          <Card.text>Director Bio: {movie.director.bio}</Card.text>
          <Button
            variant="primary"
            onClick={() => onClick()}
            className="homebutton"
          >
            Go Back
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
    );*/
  }
}
