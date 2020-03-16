import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Nav from "./Nav";
import SearchBox from "./SearchBox";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import MovieInfo from "./MovieInfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      totalResults: 0,
      searchString: "",
      currentPage: 1,
      currentMovie: null
    };
    this.apiKey = "b6dfbe28aa96652b7fd0f86b1f259b87";
  }

  handleChange = e => {
    clearTimeout(this.submit);
    this.submit = setTimeout(() => {
      this.handleSubmit();
    }, 1000);
    e.preventDefault();
    this.setState({ searchString: e.target.value });
  };

  handleSubmit = pageNumber => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchString}&page=${pageNumber}`
      )
      .then(data => {
        this.setState({
          movies: [...data.data.results],
          totalResults: data.data.total_results,
          currentPage: pageNumber
        });
      });
  };

  viewMovieInfo = id => {
    let filteredMovie;
    this.state.movies.forEach(movie => {
      if (movie.id === id) {
        filteredMovie = movie;
      }
    });
    this.setState({ currentMovie: filteredMovie });
  };

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  render() {
    let numberPages = Math.floor(this.state.totalResults / 20);
    return (
      <div>
        <Nav />
        {this.state.currentMovie === null ? (
          <div>
            <SearchBox
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              movies={this.state.movies}
            />
            <MovieList
              viewMovieInfo={this.viewMovieInfo}
              movies={this.state.movies}
            />
          </div>
        ) : (
          <MovieInfo
            closeMovieInfo={this.closeMovieInfo}
            currentMovie={this.state.currentMovie}
          />
        )}
        {this.state.totalResults > 20 && this.state.currentMovie === null ? (
          <Pagination
            pages={numberPages}
            nextPage={this.handleSubmit}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
