import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

//import "./genre-view.scss";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

export class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: { Description: "" }
    };
  }

  componentDidMount() {
    this.getGenreInfo();
  }

  getGenreInfo() {
    axios
      .get(
        // Silence of the Lambs
        `https://immense-springs-16706.herokuapp.com/movies/genres/${this.props.movieTitle}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response => {
        const data = response.data;
        this.setState({ genre: data });
        // console.log(response.data);
      })
      .catch(err => {
        console.error(err + " this is the error");
      });
  }

  render() {
    return (
      //console.log(this.state),
      <Container className="genre-view">
        <Row>
          <Col>
            <div>
              <h1 className="label">Genre</h1>
              <h4 className="value">{this.state.genre.Name}</h4>
            </div>
            <div>
              <h1 className="label">Description</h1>
              <h4 className="value">{this.state.genre.Description}</h4>
            </div>
            <Link to={"/"}>
              <Button variant="primary">Return</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="label">{this.props.genre} Movies</h1>
            <ListGroup className="movies-by-genre">
              {this.props.movies.map(movie => {
                if (movie.Genre.Name === this.state.genre.Name) {
                  return (
                    <ListGroup.Item key={movie._id}>
                      {movie.Title}
                      <Link to={`/movies/${movie._id}`}>
                        {" "}
                        <Button variant="primary" size="sm">
                          View
                        </Button>
                      </Link>
                    </ListGroup.Item>
                  );
                } else {
                  return null;
                }
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
