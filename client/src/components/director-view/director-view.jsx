import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem } from "react-bootstrap";
//csss

import axios from "axios";

class DirectorView extends React.Component {
  state = {
    Director: {
      Name: "",
      Bio: ""
    }
  };

  componentDidMount() {
    console.log("[PROPS]", this.props);
    console.log("[STATE]", this.state);

    // ROUTES => Differentiate Backend/Server/API routes from the CLIENT/BROWSER/FRONTEND ones.

    this.getDirectorInfo();
  }

  getDirectorInfo() {
    axios
      .get(
        `https://immense-springs-16706.herokuapp.com/movies/director/${this.props.directorName}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response => {
        const directorData = response.data;

        this.setState({ Director: directorData });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //if (!this.props.Director) return <div>...loading</div>;
    return (
      <Container className="director-view">
        <Row>
          <Col>
            <div>
              <h3 className="label">Director</h3>
              <p className="value">{this.state.Director.Name}</p>
            </div>
            <div>
              <h3 className="label">Bio</h3>
              <p className="value">{this.state.Director.Bio}</p>
              <p className="value">Birth: {this.state.Director.Birth}</p>
              <p className="value">Death: {this.state.Director.Death}</p>
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
            <h3 className="label">Movies by {this.props.directorName}</h3>
            <ListGroup className="movies-by-director">
              {this.props.movies.map(movie => {
                if (movie.Director.Name === this.state.Director.Name) {
                  return (
                    <ListGroupItem key={movie._id}>
                      {movie.Title}
                      <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary" size="sm">
                          View
                        </Button>
                      </Link>
                    </ListGroupItem>
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

export default DirectorView;
