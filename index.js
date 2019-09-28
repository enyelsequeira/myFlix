const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users  = Models.User;
const passport = require('passport');
const cors = require('cors');
const {check, validationResult } = require('express-validator');
require('./passport');

mongoose.set('useFindAndModify', false);
//mongoose.connect('mongodb://localhost:27017/MovieReel', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://enyel:suquC67A@myflix-yuytb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});




//Invoke middleware functions
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());


var auth = require('./auth')(app);

//Error handling middleware functions
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});


// default response when request hits the root folder
app.get('/', (req, res) => {
  res.send('Welcome to myFlixDB!');
});

//Returns a JSON object containing data about all movies
app.get('/Movies', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.find().then(Movies => res.json(Movies));
});

//Return JSON object about a single movie selcted by the user via title
app.get('/Movies/:Title', passport.authenticate('jwt', { session:false}), function(req, res)  {
  Movies.findOne({
    Title: req.params.Title
  })
  .then(movie => {
    res.json(movie)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});

// Return the genre description by name
app.get('/Genre/:Name', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.findOne({
    'Genre.Name' : req.params.Name
  })
  .then(obj => {
    res.json(obj.Genre)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});
  

//Return text response about a director (bio, birth year, death year) that was selected by the user by name
app.get('/Director/:Name', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.findOne({
    'Director.Name' : req.params.Name
})
.then(item => {
  res.json(item.Director)
})
.catch(err => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
});
  

  

//Allows new users to register
app.post('/Users',[
// Validation logic here for request
  check('Username').isAlphanumeric(),
  check('Password').isLength({ min: 5}),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {

  // check validation object for errors
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json({ errors: errors.array});
  }
  
  var hashedPassword = Users.hashPassword(req.body.Password
    );
  Users.findOne({
    Username : req.body.Username
  }) //Search to see if a user with requested username already exists
  .then(function(user) {
    if (user) {
      // If the user is found, send a response that is already exists
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user)})
      .catch(function(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Allows users to update user info
/* We'll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
} */
app.put('/Users/:Username', passport.authenticate('jwt', { session:false}), [
  
    check('Username').isAlphanumeric(),
    check('Password').isLength({ min: 5}),
    check('Email').normalizeEmail().isEmail()
  ], (req, res) => {
  // check validation object for errors
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json({ errors: errors.array});
  }
  

  var hashedPassword = Users.hashPassword(req.body.Password
    );

  Users.findOneAndUpdate({
    Username: req.params.Username
  }, {$set :
      {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday

      }},
      {new: true}, //This line makes sure that the updated document is returned
      function(err, updatedUser) {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser)
        }
      })
    });



//Allows users to add a movie to their list of favorites
app.post('/Users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username : req.params.Username},
   {
    $push: {FavoriteMovies: req.params.MovieID}
   },
  {new: true},
  function(err, updatedUser) {
    if (err) { 
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
    })
  });

//Allow users to remove a movie from their list of favorites
app.delete('/Users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $pull: {FavoriteMovies: req.params.MovieID}
  },
  {new: true},
  function (err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  })
 
});


//Allows existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username: req.params.Username})
  .then(user => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found.');
    } else {
      res.status(200).send(req.params.Username + ' was successfully deleted.');
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
    })
});





var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
console.log('Listening on port 3000');
});



console.log('yup');