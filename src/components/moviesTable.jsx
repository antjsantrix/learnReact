import React, { Component } from "react";
import Likes from './common/likes';

class MoviesTable extends Component {
  raiseSort = path =>{
    let sortColumn = this.props.sortColumn;
    if(sortColumn.path === path){
      sortColumn.order = (sortColumn.order) === 'asc'? 'desc': 'asc';
       
    }else{
      sortColumn = {path: path, order:'asc'};
    }
    this.props.onSort(sortColumn);
  }
  render() { 
    const {movies, onLike, onDelete} = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={()=> this.raiseSort('title')}>Title</th>
            <th onClick={()=> this.raiseSort('genre.name')}>Genre</th>
            <th onClick={()=> this.raiseSort('numberInStock')}>Stock</th>
            <th onClick={()=> this.raiseSort('dailyRentalRate')}>Rate</th>
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

  }
}
 
export default MoviesTable;
