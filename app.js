const express = require('express');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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

// Methodoverride middleware
app.use(methodOverride('_method'));

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to VidJot';
  
  res.render('index',{title: title});
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
  .sort({date:'desc'})
  .lean()
  .then(ideas => {
    res.render('ideas/index', {
      ideas:ideas
    });
  });
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .lean()
  .then(idea => {
    res.render('ideas/edit',{
      idea:idea
    });
  });
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
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(() => {
      res.redirect('/ideas');
    })
  }
});

// Edit Form process
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({_id:req.params.id})
  .then(idea => {
    // new value
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
    .then(idea => {
      res.redirect('/ideas');
    });
  });
});

// Console log port
app.listen(port, () => console.log(`Server started on port ${port}`));