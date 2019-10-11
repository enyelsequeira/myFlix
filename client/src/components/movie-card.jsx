import React from "react";

export class MovieCard extends React.Component {
  render() {
    // this is given to the <movieCard> component by the outer world
    // which, in this case is `mainview as mainview is what's
    //connect to your database via the movies endpoint of your api
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => movie} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}
