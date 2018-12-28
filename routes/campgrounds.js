const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require('../middleware/index.js');
//show all campground route
router.get('/', (req, res) => {
    Campground.find({}, (err, AllCampgrounds) => {
        err ? console.log(err) : res.render('campgrounds/index', {campgrounds: AllCampgrounds});
    });
});
//new campground form route
router.get('/new',middleware.isLoggedIn, (req, res) => {res.render('campgrounds/new')});
//new campground post route
router.post('/',middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name:name, price:price, image:image, description: description, author: author};
    Campground.create(newCampground, (err, newlyCreated) => {
        err ? console.log(err) : res.redirect('/campgrounds');
    });
});
//single campground page
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        (err || !foundCampground) ? (req.flash('error', 'Campground not found'), res.redirect('back')) : res.render('campgrounds/show', {campground: foundCampground});
    });
});
//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkForCampgroundsOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        err ? console.log(err) : res.render('campgrounds/edit', {campground: foundCampground});
    });
});
//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkForCampgroundsOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        err ? res.redirect('/campgrounds') : res.redirect('/campgrounds/' + req.params.id);
    });
});
//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkForCampgroundsOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        err ? res.redirect('/campgrounds/' + req.params.id) : res.redirect('/campgrounds');
    });
});

module.exports = router;
