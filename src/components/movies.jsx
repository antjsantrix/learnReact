import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenerService";
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { paginate } from './utils/paginate';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: {path:'title', order: 'asc'}
     } 

     componentDidMount(){
        let allGenre = [{_id:'', name: 'All Genre'}, ...getGenres()];
        this.setState({movies: getMovies(), genres:allGenre});
     }

     handleDelete = (id) =>{
        let movies = this.state.movies.filter(ele => ele._id !== id);
        this.setState({
            movies
        });
     }

     handleLike = (movie) =>{
        // console.log("clickced", movie)
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
     
     handleSort = (sortColumn)=>{
      this.setState({sortColumn})
     }

    render() { 
        let moviesLength = this.state.movies.length;
        if(moviesLength === 0) return <p>There are no movies in the database.</p>;

        let {pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn} = this.state;

        let filteredMovies = (selectedGenre && selectedGenre._id) ? allMovies.filter((ele)=>ele.genre._id === selectedGenre._id): allMovies;
        let sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sortedMovies, currentPage, pageSize)
        
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
              <MoviesTable movies = {movies} onLike = {this.handleLike} onDelete = {this.handleDelete} onSort = {this.handleSort} sortColumn= {sortColumn}/>
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