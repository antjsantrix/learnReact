import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenerService";
import Likes from './common/likes';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from './utils/paginate';

class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
     } 

     componentDidMount(){
        let allGenre = [{name: 'All Genre'}, ...getGenres()];
        this.setState({movies: getMovies(), genres:allGenre});
     }

     handleDelete = (id) =>{
        let movies = this.state.movies.filter(ele => ele._id !== id);
        this.setState({
            movies
        })
     }

     handleLike = (movie) =>{
        console.log("clickced", movie)
        let movies = [...this.state.movies];
        let index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].isLiked  = ! movies[index].isLiked;
        this.setState({movies});
     }

     handlePageChange = (page) =>{
       this.setState({currentPage:page})
     }

     handleGenreSelect = (genre) =>{
        this.setState({selectedGenre: genre, currentPage: 1})
     }

    render() { 
        let moviesLength = this.state.movies.length;
        if(moviesLength === 0) return <p>There are no movies in the database.</p>;

        let {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;

        let filteredMovies = (selectedGenre && selectedGenre._id) ? allMovies.filter((ele)=>ele.genre._id === selectedGenre._id): allMovies;
        const movies = paginate(filteredMovies, currentPage, pageSize)
        
        return (
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem = {this.state.selectedGenre}
                textProperty="name"
                valueProperty="_id"
              />
            </div>
            <div className="col">
              <p>Showing {filteredMovies.length} movies in the database</p>
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
                            this.handleLike(ele);
                          }}
                          movie={ele}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(ele._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemCounts={filteredMovies.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        );
    }
}
 
export default Movies;