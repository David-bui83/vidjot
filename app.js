const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')
const app = express();
const port = 7000;


// // Map global promise - get rid of warning
// mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB connected...')})
.catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to VidJot';
  
  res.render('index',{title: title});
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
  
});

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];
  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  }else{
    res.send('passed')
  }
});

// Console log port
app.listen(port, () => console.log(`Server started on port ${port}`));