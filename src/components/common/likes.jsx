import React, { Component } from 'react';

class Likes extends Component {
    render() { 
        let classes = "fa fa-heart";
        if(!this.props.movie.isLiked){
            classes += "-o"
        }
        return (<i className = {classes} onClick = {this.props.onLike} style = {{cursor: "pointer"}}></i>);
    }
}
 
export default Likes;