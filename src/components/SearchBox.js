import React from "react";

const SearchBox = props => {
  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 30 }}>
      <div className="row">
        <section className="test col s4 offset-s4">
          <form onSubmit={props.handleSubmit} action="">
            <div className="input-field">
              <input
                placeholder="Search movie"
                onChange={props.handleChange}
                list="search"
                name="search"
                type="text"
                className="validate"
              />
              <datalist id="search">
                {props.movies.map(movie => {
                  return <option key={movie.id} value={movie.title} />;
                })}
              </datalist>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SearchBox;
