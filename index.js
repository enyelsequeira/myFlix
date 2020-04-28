//importing express and morgan
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
const path = require ('path')
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
app.use(express.static('public'));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});



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

/**
*endpoint  returns a list of all movies
*endpoint URL: /movies
*GET request
*no required params
*example request:
*@function getMovies(token) {
*  axios
*    .get("https://immense-springs-16706.herokuapp.com/movies", {
*      headers: { Authorization: `Bearer ${token}` }
*    })
*    .then(response => {
*      this.props.setMovies(response.data);
*    })
*    .catch(function(error) {
*      console.log(error);
*    });
*}
*example response:
*@param {string} _id
*@param {string}title
*@param {string}description
*@param {object} director
*@param {object} genre
*/






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

/**
*endpoint allow users to register
*endpoint URL: /users
*POST request
*params required:
*@params {string} username
*@params {string} password
*@params {string} email
*@params {date} birthday
*@constant handleSubmit
*example request:
*@function handleSubmit = (e) => {
*  e.preventDefault();
*  axios.post('https://immense-springs-16706.herokuapp.com/users', {
*      username: username,
*      email: email,
*      birthday: birthday,
*      password: password,
*      confirmPassword: confirmPassword
*  })
*  .then(response =>{
*    const data = response.data;
*    console.log(data);
*    window.location.assign('/');
*  })
*  .catch(e => {
*    console.log('error registering the user')
*  });
*}
*example response:
*@param {object} user
*@params {string} username
*@params {string} password
*@params {string} email
*@params {date} birthday
*/

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



  /**
  *endpoint  allow users to update information
  *endpoint URL: /users/:username
  *PUT request
  *@params {string} username
  *@params {string} password
  *@params {string} email
  *@params {date} birthday
  *example request:
  *@function handleUpdate(token) {
  *  const { user } = this.props;
  *  const { username, email, birthday, password} = this.state;
  *  axios({
  *    method: "put",
  *    url: `https://immense-springs-16706.herokuapp.com/users/${user.username}`,
  *    headers: {
  *      Authorization: `Bearer ${token}`
  *    },
  *    data: {
  *      username: username,
  *      email: email,
  *      birthday: birthday,
  *      password: password,
  *
  *    }
  *  })
  *    .then(response => {
  *      //const data = response.data;
  *      localStorage.removeItem("token");
  *      localStorage.removeItem("user");
  *      window.location.reload();
  *    })
  *    .catch(e => {
  *      console.log("error updating the user");
  *    });
  *}
  *example response:
  *@param {object} user
  *@params {string} username
  *@params {string} password
  *@params {string} email
  *@params {date} birthday
  */

//allow to updates users info
app.put(
  "/users/:Username",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    var hashedPassword = Users.hashPassword(req.body.Password);
 
    Users.findOneAndUpdate({
        Username: req.params.Username
      }, {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
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

/**
*endpoint  add a movie to users favorites
*endpoint URL: /users/:username/favorite/:movieID
*POST request
*@params {ObjectId} _id
*@params {string} user
*@function addToFavorites() {
*  const { movie} = this.props;
*  const user = localStorage.getItem("user");
*  const token = localStorage.getItem("token");
*  console.log({ token });
*  axios
*    .post(
*      `https://immense-springs-16706.herokuapp.com/users/${user}/Favorite/${
*        movie._id
*      }`,
*      null,
*      { headers: { Authorization: `Bearer ${token}` } }
*    )
*    .then(res => {
*      console.log(res);
*      window.location.reload();
*    })
*    .catch(error => {
*      console.log(error);
*    });
*}
*example response:
* Json of users updated list of favorites
*/

//allows user to to add movie to favorites
app.post(
  "/users/:Username/Favorite/:MovieID",
  passport.authenticate("jwt", {
    session: false
  }),
  function (req, res) {
    const { params: { Username, MovieID }} = req;

    Users.findOneAndUpdate({ Username }, { $addToSet: { FavoriteMovies: MovieID } }, { new: true },
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


/**
*endpoint  delete a movie to users favorites
*endpoint URL: /users/:username/favorite/:movieID
*POST request
*@params {ObjectId} _id
*@params {string} user
*@function addToFavorites() {
*  const { movie} = this.props;
*  const user = localStorage.getItem("user");
*  const token = localStorage.getItem("token");
*  console.log({ token });
*  axios
*    .delete(
*      `https://immense-springs-16706.herokuapp.com/users/${user}/Favorite/${
*        movie._id
*      }`,
*      null,
*      { headers: { Authorization: `Bearer ${token}` } }
*    )
*    .then(res => {
*      console.log(res);
*      window.location.reload();
*    })
*    .catch(error => {
*      console.log(error);
*    });
*}
*example response:
* Json of users updated list of favorites
*/
//delete from favorites //cant get postman
app.delete("/users/:Username/Favorite/:MovieID", function (req, res) {
  const {params: {Username, MovieID}}=req
  Users.findOneAndUpdate({ Username }, { $pull: {FavoriteMovies :MovieID }}, {new: true },
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


/**
*endpoint  delete a user
*endpoint URL: /users/:username
*DELETE request
*@params {string} user
*example request:
*@function handleDelete(token) {
*  const { user } = this.props;
*  axios
*    .delete(`https://immense-springs-16706.herokuapp.com/users/${user.username}`, {
*      headers: { Authorization: `Bearer ${token}` }
*    })
*    .then(res => {
*      localStorage.removeItem("token");
*      localStorage.removeItem("user");
*      window.location.reload();
*    })
*    .catch(error => {
*      console.log(error);
*    });
*}
*example response:
* username was deleted
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

///new chagnes
//listening for request
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});
