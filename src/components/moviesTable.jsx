import React, { Component } from "react";
import Likes from './common/likes';
import TableHeaders from "./common/tableHeaders";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  render() { 
    const {movies, sortColumn, onSort} = this.props;
    const columns = [
      { path: "title", label: "Title", content: movie => <Link to ={`/movies/${movie._id}`} >{movie.title}</Link> },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Likes
            onLike={() => {
              this.props.onLike(movie);
            }}
            movie={movie}
          />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(movie._id)}
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <table className="table">
        <TableHeaders columns = {columns} sortColumn ={sortColumn} onSort = {onSort}/>
        <TableBody data={movies} columns ={columns}/>
      </table>
    );

  }
}
 
export default MoviesTable;
