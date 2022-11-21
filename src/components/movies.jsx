import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Likes from './common/likes';
class Movies extends Component {
    state = { 
        movies: getMovies()
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
    render() { 
        let moviesLength = this.state.movies.length;
        if(moviesLength === 0) return <p>There are no movies in the database.</p>;
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
                        {this.state.movies.map(ele => 
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
            </div>
        );
    }
}
 
export default Movies;