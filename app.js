const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express();
const port = 7000;


// // Map global promise - get rid of warning
// mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB connected...')})
.catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to VidJot';
  
  res.render('index',{title: title});
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Console log port
app.listen(port, () => console.log(`Server started on port ${port}`));