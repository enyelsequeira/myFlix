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
        `https://immense-springs-16706.herokuapp.com/genres/${this.props.genre}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response =>
        this.setState({
          genre: response.data
        })
      )
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Container className="genre-view">
        <Row>
          <Col>
            <div>
              <h3 className="label">Genre</h3>
              <p className="value">{this.props.genre}</p>
            </div>
            <div>
              <h3 className="label">Description</h3>
              <p className="value">{this.state.genre.Description}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="label">{this.props.genre} movies</h3>
            <ListGroup className="movies-by-genre">
              {this.props.movies.map(movie => {
                if (movie.Genre.Name === this.state.genre.Name) {
                  return (
                    <ListGroup.Item>
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
