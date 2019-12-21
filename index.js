//importing express and morgan
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
//Importing mongoose
const mongoose = require("mongoose");
const Models = require("./models");
const Movies = Models.Movie;
const Users = Models.User;
const cors = require("cors");
// passport
const passport = require("passport");
require("./passport");



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





// servers documentation.html file from public folder
app.use(express.static("public"));



app.use(cors());

app.use(bodyParser.json());

//log request using morgans's
app.use(morgan("common"));


//importing auth.js file
var auth = require('./auth')(app)
//var auth = require("./auth")(app);

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

//returns data about genre by MOVIE!!! title
app.get(
  // req.params;
  "/movies/genres/:Title",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    Movies.findOne({
        Title: req.params.Title,
      })
      .then(function (movie) {
        if (movie) {
          res
            .status(201)
            .json(movie.Genre)
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
      .then(function (movie) {
        res.json(movie.Director);
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

//allows user to to add movie to favorites
app.post(
  "/users/:Username/Favorite/:MovieID",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    const { params: { Username, MovieID } } = req;

    Users.findOneAndUpdate({ "Username": Username }, { $addToSet: { FavoriteMovies: MovieID } }, { new: true },
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


//listening for request
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});


/* POST login 
module.exports = (router) => {
  console.log('this')
  router.post('/login', (req, res, next) => {
    console.log(req.body);

    passport.authenticate('local', {
      session: false
    }, (error, user, info) => {
      console.log(user, 1);
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, {
        x: console.log(user, 2),
        session: false
      }, (error) => {
        if (error) {
          console.log(error, 'error1')
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        console.log('end', user, token)
        return res.json({
          user,
          token
        });
      });
    })(req, res, next);
  });
   */