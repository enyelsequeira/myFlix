import React from "react";
import axios from "axios";

import { MovieCard } from "./movie-card.jsx";
import { MovieView } from "./movie-view.jsx";

export class MainView extends React.Component {
  //of the hooks available in a react component

  constructor() {
    //constructor so react can initialize

    super();
    //initialize the state to an empty objec so we can destructure it
    this.state = {
      movies: [],
      selectedMovie: null
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //button
  onButtonClick = () => {
    this.setState({
      selectedMovie: null
    });
  };

  //this overrides the render() method of the superclass
  render() {
    const { movies, selectedMovie } = this.state;

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
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
    );
  }
}
