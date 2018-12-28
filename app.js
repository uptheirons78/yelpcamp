const express                       = require('express');
const bodyParser                    = require('body-parser');
const mongoose                      = require('mongoose');
const passport                      = require("passport");
const localStrategy                 = require("passport-local");
const methodOverride                = require("method-override");
const flash                         = require("connect-flash");
const app                           = express();
const PORT                          = process.env.PORT;
const IP                            = process.env.IP;

const Campground                    = require('./models/campground');
const Comment                       = require('./models/comment');
const User                          = require('./models/user');
const seedDB                        = require('./seeds');

const commentsRoutes                = require("./routes/comments");
const campgroundsRoutes             = require("./routes/campgrounds");
const indexRoutes                   = require("./routes/index");

const url = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp_v12';
mongoose.connect(url, {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//**************************************************
//PASSPORT CONFIG
//**************************************************
app.use(require('express-session')({
    secret: 'Darth is God',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//****************************************************
// USE ROUTES
//****************************************************
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);
app.use(indexRoutes);
//****************************************************
//SERVER SECTION
//****************************************************
app.listen(PORT, IP, () => console.log(`YELPCAMP SERVER IS RUNNING`));