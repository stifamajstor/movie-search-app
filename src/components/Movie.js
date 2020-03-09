import React from "react";

const Movie = props => {
  return (
    <div className="col s12 m6 l3">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          {props.image === null ? (
            <img
              src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
              alt="Movie card"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`http://image.tmdb.org/t/p/w185${props.image}`}
              alt="Movie card"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div class="card-content">
          <p>
            <a href="#" onClick={() => props.viewMovieInfo(props.movieId)}>
              View Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
