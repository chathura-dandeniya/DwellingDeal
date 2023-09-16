// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user');

// // serialize and deserialize
// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// //Middleware
// passport.use('local-login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, function (req, email, password, done) {
//   User.findOne({ email: email }, function (err, user) {
//     if (err) return done(err);

//     if (!user) {
//       return done(null, false, req.flash('loginMessage', 'No user has been found'));
//     }

//     if (!user.comparePassword(password)) {
//       return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password pal'));
//     }
//     return done(null, user);
//   });
// }));

// //custom function to validate
// exports.isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Serialize and deserialize
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// Use async/await to refactor deserializeUser
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Middleware
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, email, password, done) {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password'));
    }

    return done(null, user);

  } catch (err) {
    return done(err);
  }
}));

// Custom function to validate
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};