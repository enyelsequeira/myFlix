import React from "react";

import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieView = ({ movie, onButtonClick }) => {
  if (!movie) return null;

  // axios.post(`https://my-flix-1098.herokuapp.com/users/${localStorage.getItem('user')}/Favourites/${movie._id}`, {
  //     Username: localStorage.getItem('user')
  //   }, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   })

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `https://immense-springs-16706.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Favorite/${movie._id}`,
        {
          Username: localStorage.getItem("user")
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )

      .then(response => {
        console.log(response);
        alert("The movie Has been Added to Favorite");
      })
      .catch(event => {
        console.log("error couldnt add to movie list");
        alert("something went wrong");
      });
  }
  console.log(handleSubmit);

  return (
    <CardColumns>
      <Card border="danger" style={{ widht: "18rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          {/* {console.log(movie.Director.Name, movie.Director.Bio)} */}
          <Card.Title>Movie Title: {movie.Title}</Card.Title>
          {/* //Genre */}
          <Card.Text>Movie Genre: {movie.Genre.Name}</Card.Text>
          <Link to={`/movies/genres/${movie.Title}`}>
            <Button variant="outline-secondary">Genre</Button>
          </Link>
          {/* //Directors */}
          <Card.Text>Movie Director: {movie.Director.Name}</Card.Text>
          <Link to={`/movies/director/${movie.Director.Name}`}>
            <Button variant="primary">Director</Button>
          </Link>
          <Card.Text>Director Bio: {movie.Director.Bio}</Card.Text>
          <Link to="/">
            {" "}
            <Button variant="primary" className="homeButton">
              Go back
            </Button>
          </Link>
          <div className="text-center">
            <Button
              variant="outline-secondary"
              onClick={event => handleSubmit(event)}
            >
              {" "}
              Add to Favorites{" "}
            </Button>
            <Link to={`/`}>
              <Button className="button-back" variant="outline-info">
                MOVIES
              </Button>
            </Link>
          </div>
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
