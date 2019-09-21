//importing express and morgan 
const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
// passport
const passport = require('passport');
require('./passport');
//Importing mongoose
const mongoose = require ('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//crating var to use express functionality
const app = express();
// servers documentation.html file from public folder
app.use(express.static('public'));

app.use(bodyParser.json());

//log request using morgans's 
app.use(morgan('common'));

//connect mongoose to database
mongoose.connect('mongodb://localhost:27017/myflix2', {useNewUrlParser: true});

//importing auth.js file
var auth = require('./auth')(app);






/*//list of movies
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
    image: 'https://www.imdb.com/title/tt0499549/mediaviewer/rm843615744',
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
    image: 'https://www.imdb.com/title/tt0371746/mediaviewer/rm1544850432',
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
    image: 'https://www.imdb.com/title/tt0119654/mediaviewer/rm2364027904',

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
    image: 'https://www.imdb.com/title/tt6105098/mediaviewer/rm2458872832',
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
    image: 'https://www.imdb.com/title/tt0086190/mediaviewer/rm602420224',
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
    image: 'https://www.imdb.com/title/tt0848228/mediaviewer/rm3955117056',
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
    image: 'https://www.imdb.com/title/tt0120903/mediaviewer/rm1905724928',
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
    image: 'https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544',
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
    image: 'https://www.imdb.com/title/tt1345836/mediaviewer/rm834516224',
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
    image: 'https://www.imdb.com/title/tt0119282/mediaviewer/rm944837888',
}];

let users =[{
    username: 'enyel',
    email: 'enyel@gmail.com',
    password: '123456t',
    birthday:('1994-02-19'),
    FavoriteMovies: []

},
{
    username: 'thor',
    email: 'thor@gmail.com',
    password: '123456t',
    birthday:('1985-02-19'),
    FavoriteMovies: []

},
{
    username: 'matilde',
    email: 'matilde@gmail.com',
    password: '123456m',
    birthday:('1987-02-19'),
    FavoriteMovies: []

},
{
    username: 'frank',
    email: 'frank@gmail.com',
    password: '123456f',
    dateOfBirth: ('1995-02-19'),
    FavoriteMovies: ["5d70a859a1de173d18b1726c", "5d70a859a1de173d18b1726c", "5d70a5daa1de173d18b17269", "5d709d9e68e54b94f24"]
}];*/




//gets a list of  all movies
app.get('/movies', passport.authenticate('jwt',{ session: false
}), function (req, res) {
    Movies.find()
    .then(function(movies){
        res.status(201).json(movies)
    })
    .catch(function(err){
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//Data about a single movie by title

app.get('/movies/:Title', passport.authenticate('jwt', { session: false}), function(req, res){
    Movies.findOne({Title : req.params.Title})
    .then(function(movies){
      res.json(movies)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });
/*app.get('/movies/:title', function (req, res){
    res.json(movies.find(function(movie){
        return movie.title.toLowerCase() === req.params.title.toLowerCase()
    }));
});*/

//returns data about genre by title 
app.get('/movies/genres/:Title', passport.authenticate('jwt',{ session: false}), function(req, res) {
    Movies.findOne({Title: req.params.Title})
    .then(function(movie){
      if(movie){
        res.status(201).send("Movie with the title : " + movie.Title + " is  a " + movie.Genre.Name + " ." );
      }else{
        res.status(404).send("Movie with the title : " + req.params.Title + " was not found.");
          }
      })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });


/*app.get('/movies/:title/genre', function(req, res){
    let movie = movies.find((movie) => {
        return movie.title.toLowerCase() === req.params.title.toLowerCase();

    });
    if (movie) {
        res.status(200).send('The genre of ' + movie.title + 'is ' + movie.genre);
    } else {
        res.status(404).send('Movie ' + req.params.title + ' was not found');
    }
});*/

//returns data about the director 
app.get('/movies/director/:Name', passport.authenticate('jwt',{ session: false}), function(req, res) {
    Movies.findOne({"Director.Name" : req.params.Name})
    .then(function(movies){
      res.json(movies.Director)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });



//allow new user to register 
app.post('/users', function(req, res){
Users.findOne({Username: req.body.Username })
  .then(function(user){
    if(user){
      return res.status(400).send(req.body.Username + " already exists.");
    }else{
      Users
      .create ({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error){
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error){
      console.error(error);
      res.status(500).send("Error: " + error);
  });
});
/*
app.post('/users', function(req, res){
    let newUser = req.body;
    if(!newUser.username){
        const message = 'Username needs to register';
        res.status(400).send(message);
    }else {
        users.push(newUser);
        res.status(201).send(newUser);
    }
});*/

//list of all users by name
app.get('/users/:Username', passport.authenticate('jwt', { session: false}),  function(req, res){
    Users.findOne({Username : req.params.Username})
    .then(function(user){
        res.json(user)
    })
    .catch(function(err){
        console.error(err);
        res.status(500).send("Erro:" + err);
    });
})
/*
app.get('/users', function(req,res){
    res.json(users);
});
*/
//allow to updates users info
app.put('/users/:Username', passport.authenticate('jwt', { session: false}), function(req, res){
    Users.findOneAndUpdate({Username: req.params.Username},
        {$set:
            {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    {new: true},
    function(err,updatedUser){
        if(err){
            console.error(err);
            res.status(500).send("Error:" + err);
        }else{
            res.json(updatedUser)
        }
    });
});

/*app.put('/users/:username/:password', function(req, res){
    res.send('you have been updated');
});
app.put('/users/:username/:email/:dateOfbirth', function(req,res){
    res.send('you have been updated');
});*/

//allows user to to add movie to favorites

app.post('/users/:Username/Favorite/:MovieID', passport.authenticate('jwt',{ session: false}), function(req, res){
    Users.findOneAndUpdate({Username: req.params.Username} ,{
      $addToSet  : {Favorites : req.params.MovieID}
    },
    {new: true},
    function(err,updatedUser){
      if (err){
        console.error(err);
        res.status(500).send("Error:" + err);
      }else{
        res.json(updatedUser)
      }
    })
  });

/*app.post('/users/:username/:favorites', function(req, res){
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
});*/

//delete from favorites //cant get postman

app.delete('/users/:Username/Favorite/:MovieID', function(req, res){
    Users.findOneAndUpdate({Username: req.params.Username},{
        $pull : {Favorites : req.params.MovieID}
    },
    {new: true},
    function(err,updatedUser){
        if (err){
            console.error(err);
            res.status(500).send("Error:" + err);
        }else{
            res.json(updatedUser)
        }
    });
});
/*app.delete('/users/:username/:favorites', function (req, res){
    res.send('one movie is deleted from favorite');
});
*/
//allows users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), function(req, res){
    Users.findOneAndRemove ({Username: req.params.Username })
    .then(function(user) {
      if (!user){
        res.status(400).send("Account with the username: " + req.params.Username + " was not found .");
      }else{
        res.status(200).send("Account with the username : " + req.params.Username + " was successfully deleted.");
      }
    })
    .catch(function(err){
      console.error(err.stack);
      res.status(500).send("Error: " + err);
    });
  });

/*app.delete('/users/:username', function (req, res){
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
})*/

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
console.log('this is listening to you on port 8080')
);

