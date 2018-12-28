const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    req.isAuthenticated() ? next() : (req.flash('error', 'YOU NEED TO BE LOGGED IN TO DO THAT !'), res.redirect('/login'));
};

middlewareObj.checkForCampgroundsOwnership = function(req, res, next) {
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground) {
                if(err || !foundCampground) {
                    req.flash('error', 'SORRY, CAMPGROUND NOT FOUND !')
                    res.redirect('back');
                } else {
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash('error', 'YOU DO NOT HAVE PERMISSION TO DO THAT !');
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'YOU NEED TO BE LOGGED IN TO DO THAT !');
            res.redirect('back');
        }
};

middlewareObj.checkForCommentsOwnership = function(req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err || !foundComment) {
                    req.flash('error', 'Comment not found');
                    res.redirect('back');
                } else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash('error', 'YOU DO NOT NEED PERMISSION TO DO THAT !');
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'YOU NEED TO BE LOGGED IN TO DO THAT !');
            res.redirect('back');
        }
};

module.exports = middlewareObj;