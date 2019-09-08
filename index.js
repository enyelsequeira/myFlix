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
    genre: 'Fantasy ',
    director: {
        name: 'James Cameron',
        bio: 'is a Canadian filmmaker and environmentalist who currently lives in New Zealand and the United States',
        dateOfBirth: '1956',
        deathYear:'n/a',
    },
    image: '#',
}, 
{ 
    title: 'Iron man',
    description: 'Returning to America, Stark refines the suit and uses it to combat crime and terrorism',
    genre: 'Thriller',
    director: {
        name: 'John Favreau',
        bio: 'is an American actor, director, producer, and screenwriter. He is known for his work with the Marvel Cinematic Universe',
        dateOfBirth: '1966',
        deathYear:'n/a',
    },
    image: '#',
},
{
    title: 'Men in black',
    description: 'They are the best-kept secret in the universe. Working for a highly funded yet unofficial government agency',
    genre: 'Thriller',
    director: {
        name: 'Barry Sonnenfeld',
        bio: 'Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family and its sequel Addams Family Values',
        dateOfBirth: '1953',
        deathYear:'n/a',
    },
    image: '#',

},
{
    title: 'the lion king',
    description: 'Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny on the plains of Africa.',
    genre: 'Drama',
    director: {
        name: 'John Favreau',
        bio: 'is an American actor, director, producer, and screenwriter. He is known for his work with the Marvel Cinematic Universe',
        dateOfBirth: '1966',
        deathYear:'n/a',
    },
    image: '#',
}, 
   
{
    title: 'star wars return of the jedi',
    description: 'Luke Skywalker (Mark Hamill) battles horrible Jabba the Hut and cruel Darth Vader to save his comrades in the Rebel Alliance and triumph over the Galactic Empire',
    genre: 'Fantasy',
    director: {
        name: 'George Lucas',
        bio: 'George Walton Lucas Jr. is an American filmmaker and entrepreneur. Lucas is known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts and Industrial Light & Magic',
        dateOfBirth: '1944',
        deathYear:'n/a',
    },
    image: '#',
},
{
    title: 'Avengers',
    description: 'Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth',
    genre: 'Sci-fi ',
    director: {
        name: 'John Favreau',
        bio: 'is an American actor, director, producer, and screenwriter. He is known for his work with the Marvel Cinematic Universe',
        dateOfBirth: '1966',
        deathYear:'n/a',
    },
    image: '#',
},
{
    title: 'x-men',
    description: 'They are children of the atom, homo superior, the next link in the chain of evolution.',
    genre: 'Sci-fi ',
    director: {
        name: 'Bryan Singer',
        bio: 'Bryan Jay Singer is an American director, producer and writer of film and television. He is the founder of Bad Hat Harry Productions and has produced or co-produced almost all of the films he has directed.',
        dateOfBirth: '1944',
        deathYear:'n/a',
    },
    image: '#',
},
{ 
    title: 'Silece of the Lambs',
    description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    genre: 'Thriller',
    director: {
        name: 'John Favreau',
        bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
        dateOfBirth: '1944',
        deathYear:'2017',
    },
    image: '#',
},
{ 
    title: 'The Dark Knight Rises',
    description: 'It has been eight years since Batman (Christian Bale), in collusion with Commissioner Gordon (Gary Oldman), vanished into the night. Assuming responsibility for the death of Harvey Dent, Batman sacrificed everything for what he and Gordon hoped would be the greater good',
    genre: 'Thriller',
    director: {
        name: 'Christoper Nolan',
        bio: 'Christopher Edward Nolan, CBE is an English-American film director, screenwriter, and producer, who is known for making personal, distinctive films within the Hollywood mainstream.',
        dateOfBirth: '1970',
        deathYear:'n/a',
    },
    image: '#',
},
{
    title : 'Hercules',
    description: 'Though he is famous across the ancient world for his larger-than-life exploits,',
    genre: 'Fantasy',
    director: {
        name: 'Brett Ratner',
        bio: 'Brett Ratner is an American director and producer. He directed the Rush Hour film series, The Family Man, Red Dragon, X-Men: The Last Stand, and Tower Heist.',
        dateOfBirth: '1944',
        deathYear:'n/a',
    },
    image: '#',
}];

let users =[{
    username: 'EnyelSequeira',
    email: 'enyelsequeira@hotmail.com',
    password: '1234movies',
    dateOfBirth: 04/04/1994,
    favoriteMovies: []

},
{
    username: 'JoeyT',
    email: 'joey@gmail.com',
    password: '1234movies',
    dateOfBirth: '05/05/1995',
    favoriteMovies: []
}];

//Data about a single movie by title
app.get('/movies', function (req, res) {
    res.json(movies);
  });


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
        res.status(200).send('The genre of ' + movie.title + 'is ' + movie.genre);
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


