const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware/index.js');
//new comment form route
router.get('/new',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        err ? console.log(err) : res.render('comments/new', {campground: campground});
    });
});
//new comment post route
router.post('/',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    req.flash('error', 'SORRY, SOMETHING WENT WRONG !')
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'THANKS, YOU ADDED A COMMENT !');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});
//EDIT COMMENT ROUTE
router.get('/:comment_id/edit',middleware.checkForCommentsOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash('error', 'Campground not found');
            res.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            err ? res.redirect('back') : res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }); 
    });
});

//COMMENT UPDATE ROUTE
router.put('/:comment_id',middleware.checkForCommentsOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        err ? res.redirect('back') : res.redirect('/campgrounds/' + req.params.id);
    });
});

//COMMENT DELETE ROUTE
router.delete('/:comment_id',middleware.checkForCommentsOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        err ? res.redirect('back') : (req.flash('success', 'COMMENT DELETED !'), res.redirect('/campgrounds/' + req.params.id));
    });
});

module.exports = router;