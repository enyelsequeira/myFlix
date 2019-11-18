var jwtSecret = 'your_jwt_secret';
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}


module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', {
      session: false
    }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, {
        session: false
      }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({
          user,
          token
        });
      });
    })(req, res);
  });
}
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
  
}*/
/*module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', (error, user, message) => {
      if (error || !user) {
        return res.status(400).json({
          message,
          user: user
        });
      }
      req.login(user, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({
          user,
          token
        });
      });
    })(req, res);
  });
}
*/
//"Bearer" + token,


/* POST login 
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', {
      session: false
    }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: `${error}`,
          user: user
        });
      }
      req.login(user, {
        session: false
      }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({
          user,
          token
        });
      });
    })(req, res);
  });
}
*/