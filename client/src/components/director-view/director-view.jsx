import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//csss

import axios from "axios";
import ListGroup from "react-bootstrap";

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: { Bio: "" }
    };
  }

  componentDidMount() {
    this.getDirectorInfo();
  }

  getDirectorInfo() {
    axios
      .get(
        `https://immense-springs-16706.herokuapp.com/director/${this.props.Name}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response =>
        this.setState({
          director: response.data
        })
      )
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Container className="director-view">
        <Row>
          <Col>
            <div>
              <h3 className="label"> Director</h3>
              <p className="value">{this.props.Director.Name}</p>
            </div>
            <div>
              <h3 className="label">Bio</h3>
              <p className="value">{this.state.Director.Bio}</p>
            </div>
            <div className="return-button">
              <Link to={"/"}>
                <Button variant="primary">Return</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="label">Movies by {this.props.Director.Name}</h3>
            <ListGroup className="movies-by-director">
              {this.props.movies.map(movie => {
                if (movie.Director.Name === this.state.Director.Name) {
                  return (
                    <ListGroup.Item>
                      {movie.Title}
                      <Link to={`/movies/${movie._id}`}>
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
