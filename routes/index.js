const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
//landing page route
router.get('/', (req, res) => {res.render('campgrounds/landing')});
//registration page and form route
router.get('/register', (req, res) => {res.render('register')});
//handle registration form
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome to YelpCamp: ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});
//login route
router.get('/login', (req, res) => {res.render('login')});
//handle login route
router.post('/login', passport.authenticate('local', {successRedirect: '/campgrounds', failureRedirect: '/login'}), (req, res) => {});
//logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out!');
    res.redirect('/campgrounds');
});

module.exports = router;