//importing express and morgan 
const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//crating var to use express functionality
const app = express();

app.use(bodyParser.json());

// servers documentation.html file from public folder
app.use(express.static('public'));
//log request using morgans's 
app.use(morgan('common'));

//list of movies
let movies = [ {
    title: 'avatar',
    description: 'a paralyzed former Marine, becomes mobile again through one such Avatar and falls in love with a Navi woman',
    genre: 'Fantasy/Sci-fi ',
    director: 'James Cameron',
    image: '#',
}, 
{ 
    title: 'Iron man',
    description: 'Returning to America, Stark refines the suit and uses it to combat crime and terrorism',
    genre: 'Sci-fi/Thriller',
    director: 'Jon Favreau',
    image: '#',
},
{
    title: 'Men in black',
    description: 'They are the best-kept secret in the universe. Working for a highly funded yet unofficial government agency',
    genre: 'Sci-fi/Thriller',
    director: 'Barry Sonnenfeld',
    image: '#',

},
{
    title: 'the lion king',
    description: 'Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny on the plains of Africa.',
    genre: 'Drama/Adventure',
    director: ' Jon Favreau',
    image: '#',
},
{
    title: 'Avengers',
    description: 'Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth',
    genre: 'Fantasy/Sci-fi ',
    director: 'Anthony Russo',
    image: '#',
},
{
    title: 'x-men',
    description: 'They are children of the atom, homo superior, the next link in the chain of evolution.',
    genre: 'Fantasy/Sci-fi ',
    director: 'Bryan Singer',
    image: '#',
},
{
    title : 'Hercules',
    description: 'Though he is famous across the ancient world for his larger-than-life exploits,',
    genre: 'Fantasy/Action ',
    director: 'Brett Ratner',
    image: '#',
}];

let users =[{
    username: 'EnyelSequeira',
    email: 'enyelsequeira@hotmail.com',
    password: '1234movies',
    dateOfBirth: 04/04/1994,
    favorites: []

},
{
    username: 'JoeyT',
    email: 'joey@gmail.com',
    password: '1234movies',
    dateOfBirth: '05/05/1995',
    favorites: []
}];

//Data about a singel movie by title
/*app.get('/movies', function(req, res){
    res.json(movies.find(function(movie){
        return movie.toLowerCase() === req.params.title.toLowerCase()
    }));*/


app.get('/movies/:title', function (req, res){
    res.json(movies.find(function(movie){
        return movie.title.toLowerCase() === req.params.title.toLowerCase()
    }));
});

//returns data about genre by title 
app.get('/movies/:title/genre', function(req, res){
    let movie = movies.find((movie) => {
        return movie.title.toLowerCase() === req.params.title.toLowerCase();

    });
    if (movie) {
        res.status(201).send('The genre of ' + movie.title + 'is ' + movie.genre);
    } else {
        res.status(404).send('Movie ' + req.params.title + ' was not found');
    }
});

//returns data about the director
app.get('/directors/:name', function(req, res){
    res.send('The directors bio');
});

//allow new user to register
app.post('/users', function(req, res){
    let newUser = req.body;
    if(!newUser.username){
        const message = 'Username needs to register';
        res.status(400).send(message);
    }else {
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//list of all users
app.get('/users', function(req,res){
    res.json(users);
});

//allow to updates users info

app.put('/users/:username/:password', function(req, res){
    res.send('you have been updated');
});
app.put('/users/:username/:email/:dateOfbirth', function(req,res){
    res.send('you have been updated');
});

//allows user to to add movie to favorites

app.post('/users/:username/:favorites', function(req, res){
    let newFavorite = req.body;

    if (!newFavorite.title){
        const messsage = "mising movie title";
        res.status(400).send(message);
    } else {
        let user = users.find(function(user){
            return user.username === req.params.username
        });
        user.favorites.push(newFavorite);
        res.status(201).send(user.favorites);
    }
});

//delete from favorites
app.delete('/users/:username/:favorites', function (req, res){
    res.send('one movie is deleted from favorite');
});

//allows users to deregister

app.delete('/users/:username', function (req, res){
    let user = users.find (function (user){
        return user.username.toLowerCase() === req.params.username.toLowerCase()
    });

    if (user){
        let newUsers = users.filter(function (obj){
            return obj.username.toLowerCase() !== req.params.username.toLowerCase()
        });
        users = newUsers;
        res.status(201).send(req.params.username + 'user has been deleted')
    }else {
        res.status(404).send('profile with username' + req.params.username + ' was not found');

    }
})





//GET requests
app.get('/', function(req, res){
    res.send('Welcome to my favorite movies');
});


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('something is wrong');
});

//listening for request
app.listen(8080, () => 
console.log('this is listening on port 8080')
);