const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const port = 7000;

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