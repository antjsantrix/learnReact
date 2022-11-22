import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Likes from './common/likes';
import Pagination from './common/pagination';
import { paginate } from './utils/paginate';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
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

    render() { 
        let moviesLength = this.state.movies.length;
        if(moviesLength === 0) return <p>There are no movies in the database.</p>;

        let {pageSize, currentPage, movies: allMovies} = this.state;
        const movies = paginate(allMovies, currentPage, pageSize)
        
        return (
            <div>
                <p>Showing {this.state.movies.length} movies in the database</p>
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
                        {movies.map(ele => 
                            <tr key={ele._id}>
                                <td>{ele.title}</td>
                                <td>{ele.genre.name}</td>
                                <td>{ele.numberInStock}</td>
                                <td>{ele.dailyRentalRate}</td>
                                <td>
                                    <Likes onLike = {() => {this.handleLike(ele)}} movie = {ele}/>
                                </td>
                                <td>
                                    <button className='btn btn-danger btn-sm' onClick={()=>this.handleDelete(ele._id)}>Delete</button> 
                                </td>
                            </tr>
                            
                        )}
                    </tbody>
                    </table>
                    <Pagination itemCounts = {moviesLength} pageSize={pageSize} currentPage = {currentPage} onPageChange ={this.handlePageChange}/>
            </div>
        );
    }
}
 
export default Movies;