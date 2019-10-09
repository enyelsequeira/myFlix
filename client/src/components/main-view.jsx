import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
    //of the hooks available in a react component
    componentDidMount(){
        axios.get('<my-api-endpoint/movie>')
        .then(response => {
            //assing result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch (function (error){
            console.log(error);            
        });
    }
    constructor (){
        //constructor so react can initialize

        super();
        //initialize the state to an empty objec so we can destructure it 
        this.state={};
    }

    //this overrides the render() method of the superclass
    render(){
        const {movies}= this.state;

        //before the movies have been loaded
        if(!movies)return <div className= "main-view"/>;

        return (
            <div className= "main-view"></div>
            { movies.map(movie => (
                <div className= "movie-card" key = {movie._id}> {movie.Title}</div>
            ))}
            </div>
        );
    }
}
