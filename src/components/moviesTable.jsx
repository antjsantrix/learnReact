import React from "react";
import Likes from './common/likes';

const MoviesTable = (props) => {
    const {movies, onLike, onDelete} = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
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
