import React from "react";
import axios from "axios";

//bootstrap imports
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MovieCard } from "./movie-card.jsx";
import MovieView from "./movie-view.jsx";
import LoginView from "./login-view";
import RegistrationView from "./registration-view";

import "./main-view.scss";

export class MainView extends React.Component {
  //of the hooks available in a react component

  constructor() {
    //constructor so react can initialize

    super();
    //initialize the state to an empty objec so we can destructure it
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick = movie => this.setState({ selectedMovie: movie });

  //loggedIn
  onLoggedIn = authData => {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);

    this.getMovies(authData.token);
  };

  getMovies(token) {
    //console.log("[1]");
    axios
      .get("https://immense-springs-16706.herokuapp.com/movies", {
        // x: console.log(token, "[3]"),
        headers: { Authorization: `Bearer ${token}` } /*authData.*/
      })
      .then(response => {
        //asing the results to the state
        this.setState({ movies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //button to retun back
  onButtonClick = () => this.setState({ selectedMovie: "" });

  //testing
  onSignedIn = user => {
    this.setState({
      user: user,
      register: false
    });
  };

  //testing
  register = () => this.setState({ register: true });

  //this overrides the render() method of the superclass
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // console.log(user, register, movies);

    if (!user && register === false)
      return (
        <LoginView
          register={this.register}
          /* onClick={() => this.register()}*/
          onLoggedIn={this.onLoggedIn}
        />
      );

    if (register)
      return (
        <RegistrationView
          alreadyMember={this.alreadyMember}
          onSignedIn={this.onSignedIn}
        />
      );

    //before the movies have been loaded //check this///////////////
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onButtonClick={this.onButtonClick}
              />
            ) : (
              movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={this.onMovieClick}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
