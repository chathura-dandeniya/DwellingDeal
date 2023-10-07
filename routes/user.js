var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/login', function (req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.render('accounts/profile', { user: user });
  } catch (err) {
    next(err);
  }
});

router.get('/signup', function (req, res, next) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', async function (req, res, next) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');
      return res.redirect('/signup');
    }

    var user = new User();
    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.picture = user.gravatar();
    
    console.log(user);
    await user.save();

    req.logIn(user, function (err) {
      if (err) return next(err);
      res.redirect('/profile');
    });

  } catch (err) {
    next(err);
  }
});

//............................................................
// router.get('/logout', function (req, res, next) {
//   req.logout();
//   res.redirect('/');
// });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      // Report the error
      console.error("Error during logout:", err);
      return next(err);
    }
    // Redirect on successful logout
    res.redirect('/');
  });
});

//............................................................

router.get('/editProfile', function (req, res, next) {
  res.render('accounts/editProfile', { message: req.flash('success') });
});

router.post('/editProfile', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (req.body.name) user.profile.name = req.body.name;
    if (req.body.address) user.address = req.body.address;

    await user.save();

    req.flash('success', 'Successfully Edited your profile');
    return res.redirect('/editProfile');
  } catch (err) {
    next(err);
  }
});

module.exports = router;