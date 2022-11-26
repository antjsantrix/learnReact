import React from "react";
import Likes from './common/likes';

const MoviesTable = (props) => {
    const {movies, onLike, onDelete, onSort} = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={()=> onSort('title')}>Title</th>
          <th onClick={()=> onSort('genre.name')}>Genre</th>
          <th onClick={()=> onSort('numberInStock')}>Stock</th>
          <th onClick={()=> onSort('dailyRentalRate')}>Rate</th>
          <th>Like</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map((ele) => (
          <tr key={ele._id}>
            <td>{ele.title}</td>
            <td>{ele.genre.name}</td>
            <td>{ele.numberInStock}</td>
            <td>{ele.dailyRentalRate}</td>
            <td>
              <Likes
                onLike={() => {
                  onLike(ele);
                }}
                movie={ele}
              />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(ele._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
