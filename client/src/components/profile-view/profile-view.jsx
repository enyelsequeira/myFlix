import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

    /**
     * gets user information for display and sets the state with it.
     * @param {*} token 
     */

  getUserInfo() {
    axios
      .get(
        `https://immense-springs-16706.herokuapp.com/movies/users/${localStorage.user}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  
  render() {
    if (!localStorage.user) {
      return <Redirect to="/" />;
    } else {
      console.log(this.props.movies);
      return (
        <Container className="profile-view">
          <Row>
            <Col>
              <h2>User profile</h2>
              <div className="user-username">
                <h3 className="label">Username</h3>
                <p className="value">{this.state.username}</p>
              </div>
              <div className="user-email">
                <h3 className="label">Email</h3>
                <p className="value">{this.state.email}</p>
              </div>
              <div className="user-birthday">
                <h3 className="label">Birthday</h3>
                <p className="value">{this.state.birthday}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="label">Favorite Movies</h3>
              <ListGroup className="user-favorite-movies">
                {this.props.movies.map(mov => {
                  if (
                    mov._id ===
                    this.state.favoriteMovies.find(favMov => favMov === mov._id)
                  ) {
                    return <ListGroup.Item>{mov.Title}</ListGroup.Item>;
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
}
