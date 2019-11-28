import React from "react";

import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LoginView, RegistrationView, MovieView, MovieCard } from "../";
import { DirectorView } from "../director-view/director-view";
import { GenereView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";

class MainView extends React.Component {
  //of the hooks available in a react component

  constructor() {
    //constructor so reactw can initialize

    super();
    //initialize the state to an empty objec so we can destructure it
    this.state = {
      movies: [],
      user: null
    };
    this.updateProfile = this.updateProfile.bind(this);
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

  //onMovieClick = movie => this.setState({ selectedMovie: movie });

  //loggedIn
  onLoggedIn = authData => {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);

    this.getMovies(authData.token);
  };

  updateProfile(field, newValue) {
    // Update user state
    let config = this.state.user;
    config[field] = newValue;
    this.setState({
      user: config
    });
    localStorage.setItem("user", JSON.stringify(this.state.user));
  }

  resetUserState() {
    this.setState({
      user: ""
    });
  }

  /*login out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    //console.log("[1]");
    axios
      .get("https://immense-springs-16706.herokuapp.com/movies", {
        // x: console.log(token, "[3]"),
        headers: { Authorization: `Bearer ${token}` } 
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
*/
  //this overrides the render() method of the superclass
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //new logiC?
    if (!movies) return <div className="main-view" />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    return (
      <Router>
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => (
                <MovieCard key={m._id} movie={m} userInfo={userInfo} />
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
/*return (
        <Router>
          <Container className="main-view" fluid="true">
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                }}
              />
              <Route path="/register" render={() => <RegistrationView />} />
              <Route path="/profile" render={() => <Redirect to="/" />} />
            </Row>
          </Container>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar sticky="top" bg="dark" variant="dark">
            <Nav className="nav-bar">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </Nav>
          </Navbar>
          <Container className="main-view" fluid="true">
            <Row>
              <Route
                exact
                path="/"
                render={() =>
                  movies.map(m => <MovieCard key={m._id} movie={m} />)
                }
              />
              <Route
                path="/profile"
                render={() => (
                  <ProfileView
                    movies={this.state.movies}
                    user={this.state.user}
                    updateProfile={this.updateProfile}
                    resetUserState={() => this.resetUserState()}
                    onLoggedIn={this.onLoggedIn}
                  />
                )}
              />
              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )}
              />
              <Route
                path="/genre/:Genre"
                render={({ match }) => (
                  <GenreView
                    movies={this.state.movies}
                    genre={match.params.Genre}
                  />
                )}
              />
              <Route
                path="/directors/:name"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return (
                    <DirectorView
                      director={
                        movies.find(m => m.Director.Name === match.params.name)
                          .Director
                      }
                    />
                  );
                }}
              />
            </Row>
          </Container>
        </Router>
      );
    }
  }
}*/
/*  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

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
      <Router>
        <Container className="main-view" fluid="true">
          <Row>
            <Route
              exact
              path="/"
              render={() => {
                if (!user) {
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                } else {
                  return movies.map(movie => (
                    <Col xl={3} sm={6} md={4} xs={12}>
                      <MovieCard user={user} key={movie._id} movie={movie} />
                    </Col>
                  ));
                }
              }}
            />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route
              path="/profile"
              render={() => (
                <ProfileView
                  movies={this.state.movies}
                  user={this.state.user}
                  updateProfile={this.updateProfile}
                  onLoggedIn={this.onLoggedIn}
                />
              )}
            />
            <Route
              path="/movies/:Id"
              render={({ match }) => (
                <Col>
                  <MovieView
                    user={this.state.user}
                    movie={movies.find(movie => movie._id === match.params.Id)}
                    updateProfile={this.updateProfile}
                  />
                </Col>
              )}
            />
            <Route
              path="/genre/:Genre"
              render={({ match }) => (
                <GenreView
                  movies={this.state.movies}
                  genre={match.params.Genre}
                />
              )}
            />
            <Route
              path="/director/:Director"
              render={({ match }) => (
                <DirectorView
                  movies={this.state.movies}
                  directorName={match.params.Director}
                />
              )}
            />
          </Row>
        </Container>
      </Router>
      /*
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
}*/
export default MainView;
