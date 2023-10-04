const express = require('express');
var router = require('express').Router();

router.get('/paymentLogin', function (req, res) {
    const message = "Please Login";
    res.render('accounts/paymentLogin', {message});
  });

router.get('/signup', function (req, res) {
    res.render('accounts/signup');
});


module.exports = router;