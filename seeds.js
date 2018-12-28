const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {name: 'Cloud\'s Heaven', image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'},
    {name: 'Rockin Tent', image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'},
    {name: 'Blues Camping', image: 'https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'}
];

function seedDB() {
    Campground.remove({}, err => {err ? console.log(err) : console.log(`All Campgrounds Removed`)});
    //REMOVE ALL CAMPGROUNDS FROM DB
    // Campground.remove({}, (err) => {
    //     err ? console.log(err) : 
    //     (console.log(`Removed Campgrounds`), 
    //     data.forEach(seed => {
    //         Campground.create(seed, (err, campground) => {
    //             err ? console.log(err) : (console.log(`Added a Campground`), Comment.create({
    //                 text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla',
    //                 author: 'Homer J. Simpson'
    //             }, (err, comment) => {
    //                 if(err) {console.log(err);}
    //                 else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log(`created new comment`);
    //                 }
    //             }));
    //         });
    //     }));
    // });
}

module.exports = seedDB;