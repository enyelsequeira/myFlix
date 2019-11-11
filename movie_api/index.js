//importing express and morgan
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
//Importing mongoose
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const cors = require("cors");
// passport
const passport = require("passport");
require("./passport");

//
//const path = require('path');
//

const {
  check,
  validationResult
} = require("express-validator");


//crating var to use express functionality
const app = express();

//connect mongoose to database
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
mongoose.connect(
  "mongodb+srv://enyel:suquC67A@myflix-yuytb.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
  }
);
//
//mongoose.set('useFindAndModify', false);
//

/*var allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://sheltered-scrubland-70732.herokuapp.com/', 'http://localhost:1234'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));*/



// servers documentation.html file from public folder
app.use(express.static("public"));



app.use(cors());

app.use(bodyParser.json());

//log request using morgans's
app.use(morgan("common"));


//importing auth.js file
var auth = require("./auth")(app);

//error hanglding middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("something is wrong");
  next();
});

//default response
app.get("/", function (req, res) {
  res.send("Welcome to my favorite movies");
});

//gets a list of  all movies
app.get('/movies', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
//november 6 changes
/*app.get("/movies", passport.authenticate("jwt", {
  session: false
}), function (
  req,
  res
) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});*/
//Data about a single movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Movies.findOne({
        Title: req.params.Title
      })
      .then(function (movies) {
        res.json(movies);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);
/*app.get('/movies/:title', function (req, res){
    res.json(movies.find(function(movie){
        return movie.title.toLowerCase() === req.params.title.toLowerCase()
    }));
});*/
//returns data about genre by title
app.get(
  "/movies/genres/:Title",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Movies.findOne({
        Title: req.params.Title
      })
      .then(function (movie) {
        if (movie) {
          res
            .status(201)
            .send(
              "Movie with the title : " +
              movie.Title +
              " is  a " +
              movie.Genre.Name +
              " ."
            );
        } else {
          res
            .status(404)
            .send(
              "Movie with the title : " + req.params.Title + " was not found."
            );
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);
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
app.get(
  "/movies/director/:Name",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Movies.findOne({
        "Director.Name": req.params.Name
      })
      .then(function (movies) {
        res.json(movies.Director);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//Allows new users to register
app.post(
  "/Users",
  [
    // Validation logic here for request
    check("Username").isAlphanumeric(),
    check("Password").isLength({
      min: 5
    }),
    check("Email")
    .normalizeEmail()
    .isEmail()
  ],
  (req, res) => {
    // check validation object for errors
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(422).json({
        errors: errors.array
      });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({
        Username: req.body.Username
      }) // Search to see if a user with requested username already exists
      .then(function (user) {
        if (user) {
          // If the user is found, send a response that is already exists
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then(function (user) {
              res.status(201).json(user);
            })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/*//allow new user to register 
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
});*/
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
app.get(
  "/users/:Username",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Users.findOne({
        Username: req.params.Username
      })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Erro:" + err);
      });
  }
);
/*
app.get('/users', function(req,res){
    res.json(users);
});
*/
//allow to updates users info
app.put(
  "/users/:Username",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Users.findOneAndUpdate({
        Username: req.params.Username
      }, {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      }, {
        new: true
      },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error:" + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);
/*app.put('/users/:username/:password', function(req, res){
    res.send('you have been updated');
});
app.put('/users/:username/:email/:dateOfbirth', function(req,res){
    res.send('you have been updated');
});*/
//allows user to to add movie to favorites
app.post(
  "/users/:Username/Favorite/:MovieID",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Users.findOneAndUpdate({
        Username: req.params.Username
      }, {
        $addToSet: {
          Favorites: req.params.MovieID
        }
      }, {
        new: true
      },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error:" + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);
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
app.delete("/users/:Username/Favorite/:MovieID", function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $pull: {
        Favorites: req.params.MovieID
      }
    }, {
      new: true
    },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});
/*app.delete('/users/:username/:favorites', function (req, res){
    res.send('one movie is deleted from favorite');
});
*/
//allows users to deregister
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Users.findOneAndRemove({
        Username: req.params.Username
      })
      .then(function (user) {
        if (!user) {
          res
            .status(400)
            .send(
              "Account with the username: " +
              req.params.Username +
              " was not found ."
            );
        } else {
          res
            .status(200)
            .send(
              "Account with the username : " +
              req.params.Username +
              " was successfully deleted."
            );
        }
      })
      .catch(function (err) {
        console.error(err.stack);
        res.status(500).send("Error: " + err);
      });
  }
);
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
    })*/
//GET requests

//listening for request
var port = process.env.PORT || 2000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});