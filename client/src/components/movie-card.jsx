import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} className="movie-card">
      {movie.Title}
    </div>
  );
};
