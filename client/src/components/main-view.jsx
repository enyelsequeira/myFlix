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
    axios
      .get("https://sheltered-scrubland-70732.herokuapp.com/movies")
      .then(res => {
        //assing result to the state
        this.setState({
          movies: res.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick = movie => this.setState({ selectedMovie: movie });

  //loggedIn
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //button to retun back
  onButtonClick = () => this.setState({ selectedMovie: "" });

  //testing
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  //testing
  register = () => this.setState({ register: true });

  //this overrides the render() method of the superclass
  render() {
    const { movies, selectedMovie, user, register } = this.state;
    if (!user && register === false)
      return (
        <LoginView
          onClick={() => this.register()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

    if (register)
      return (
        <RegistrationView
          alreadyMember={() => this.alreadyMember()}
          onSignedIn={user => this.onSignedIn(user)}
        />
      );

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onButtonClick={this.onButtonClick}
                /* onClick={() => this.onButtonClick()}*/
              />
            ) : (
              movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={this.onMovieClick}
                    /*onMovieClick={movie => this.onMovieClick(movie)}*/
                    /*onClick={movie => this.onMovieClick(movie)}*/
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );

    /*return (
      <div className="main-view">
    
        {selectedMovie ? (
          <MovieView movie={selectedMovie} goBack={this.onButtonClick} />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );*/
  }
}
