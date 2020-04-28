import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap"; //import "./profile-view.scss";
import equal from 'fast-deep-equal'

import { Link } from "react-router-dom";
import { ProfileUpdate } from "../profile-view/profile-update";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      userData: null
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
        `https://immense-springs-16706.herokuapp.com/users/${localStorage.user}`,
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

<<<<<<< HEAD
  
=======
  deleteMovieFromFavorite(event, favoriteMovieId) {
    event.preventDefault();
    console.log(localStorage.getItem("user"));
    console.log(favoriteMovieId);
    axios
      .delete(
        `https://immense-springs-16706.herokuapp.com/users/${localStorage.getItem("user")}/Favorite/${favoriteMovieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.setState({ favoriteMovies: response.data.FavoriteMovies});
      })
      .catch(event => {
        alert("Oops... something went wrong...");
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

>>>>>>> 3f6eb26a885c3d035ebb3f53b9abc7fdd837ef0e
  render() {
    const {favoriteMovies} =this.state;
    const movies = JSON.parse(localStorage.getItem(movies));

    const favoriteMovieComponents = this.props.movies.map((mov) => 
      mov._id === this.state.favoriteMovies.find(favMovId => favMovId === mov._id) 
        ? <ListGroupItem key={mov._id} > 
          {mov.Title}                      
          <Button onClick={event => this.deleteMovieFromFavorite(event, mov._id)}>REMOVE</Button>
          </ListGroupItem> 
        : null
    );

    if (!localStorage.user) {
      return <Redirect to="/" />;
    } else {
      //console.log(this.props);
      return (
        <Container className="profile-view">
          <Row>
            <Col>
              <h1>User profile</h1>
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
              <h3 className="label">My Favorite Movies</h3>
              <ListGroup className="user-favorite-movies" >{favoriteMovieComponents}</ListGroup>
              <div className="text-center">
                <Link to={`/`}>
                  <Button className="button-back" variant="outline-info">
                    MOVIES
                  </Button>
                </Link>
                <Link to={`/update/:Username`}>
                  <Button className="button-update" variant="outline-secondary">
                    Update profile
                  </Button>
                </Link>
                <Link to={"/"}>
                  <Button variant="outline-secondary">Return</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
