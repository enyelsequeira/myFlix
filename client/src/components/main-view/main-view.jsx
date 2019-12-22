import React from "react";
import axios from "axios";
import {connect} from 'react-redux';

import {setMovies} from '../../actions/actions'

//import bootstrap and routing
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

//importing components
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import MovieCard from "../movie-card/movie-card";
import RegistrationView from "../registration-view/registration-view";
import DirectorView from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-update";
import "./main-view.scss";

class MainView extends React.Component {
  //of the hooks available in a react component
  constructor() {
    //constructor so reactw can initialize
    super();
    //initialize the state to an empty objec so we can destructure it
    this.state = {
      movies: [],
      user: null,
      email: "",
      birthday: "",
      userInfo: {}
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

  getUser(token) {
    axios
      .get("https://immense-springs-16706.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoggedUser(response.data);
      })
      .catch(error => {
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
  ///???????????
  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.Username);
  }
  //login out

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }
  /*login out
 
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
  //button to retun back
  onButtonClick = () => this.setState({ selectedMovie: "" });
  //this overrides the render() method of the superclass
  render() {
    const {
      movies,
      selectedMovie,
      user,
      register,
      userInfo,
      token
    } = this.state;

    //new logiC?

    return (
      <Router>
        <header>
          <Link to={"/"}>
            <h1 className="appName"> MOVIE FLIX BY: E</h1>
          </Link>
        </header>
        <div className="btn-group"></div>
        <Link to={`/users/${user}`}>
          <Button className="profile-view" variant="primary">
            Profile
          </Button>
          <Button
            className="logout"
            variant="info"
            onClick={() => this.onLogout()}
          >
            Log out
          </Button>
        </Link>

        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              //console.log(user);
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ));
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          {/* you keep the rest routes here */}
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/movies/genres/:Title"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <GenreView
                  movies={this.state.movies}
                  movieTitle={match.params.Title}
                />
              );
            }}
          />
          <Route
            path="/movies/director/:Director"
            render={({ match }) => {
              console.log("this is rendering now", match);
              return (
                <DirectorView
                  directorName={match.params.Director}
                  movies={this.state.movies}
                />
              );
            }}
          />
          <Route
            path="/users/:Username"
            render={({ match }) => {
              return <ProfileView movies={this.state.movies}  movieTitle={match.params.Title}/>;
            }}
          />
          <Route
            path="/update/:Username"
            render={() => (
              <ProfileUpdate
                userInfo={userInfo}
                user={user}
                token={token}
                updateUser={data => this.updateUser(data)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
export default MainView;
