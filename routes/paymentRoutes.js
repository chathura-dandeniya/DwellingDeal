const express = require('express');
var router = require('express').Router();

router.get('/paymentLogin', function (req, res) {
    const message = "Please Login";
    res.render('accounts/paymentLogin', {message});
  });

router.get('/paymentSignUp', function (req, res) {
    res.render('accounts/paymentSignUp');
});


module.exports = router;