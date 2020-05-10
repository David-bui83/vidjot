const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = process.env.port || 7000;

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// // Map global promise - get rid of warning
// mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB connected...')})
.catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Methodoverride middleware
app.use(methodOverride('_method'));

// Connect-flash middleware
app.use(flash());

// Express-session middleware
app.use(session({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true
}));

// Global vairables
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to VidJot';
  
  res.render('index',{title: title});
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

// Passport Config
require('./config/passport')(passport);

// Console log port
app.listen(port, () => console.log(`Server started on port ${port}`));