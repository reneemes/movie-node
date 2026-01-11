require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const movieService = require('./utils/movieService');

const app = express();
const port = process.env.PORT || 8080;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

hbs.registerHelper('isActive', (currentPath, linkPath) => {
  return currentPath === linkPath ? 'active' : '';
});

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use((req, res, next) => {
  res.locals.activePage = req.path;
  next();
});

app.get('', (req, res) => {
  res.render('index', {
    title: 'Rancid Tomatillos',
    name: 'Renee Messersmith'
  });
  
});

app.get('/movies', (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).send({
      error: 'You must provide a movie title.'
    });
  }

  movieService.getMovieId(title, (error, movieId) => {
    if (error) {
      return res.status(404).send({ error });
    }

    movieService.getSimilarMovies(movieId, (error, movies) => {
      if (error) {
        return res.status(404).send({ error });
      }

      // res.send(movies);
      res.json({
        title,
        results: movies
      });
    })
  });
});

app.get('/movies/popular', (req, res) => {
  movieService.getPopularMovies((error, popularMovies) => {
    if (error) {
      return res.status(500).send({error});
    }

    res.send(popularMovies);
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Rancid Tomatillos',
    name: 'Renee Messersmith'
  });
});

// app.get('/help', (req, res) =>{
//   res.render('index', {
//     title: 'Rancid Tomatillos',
//     name: 'Renee Messersmith'
//   });

// });

app.use((req, res, next) =>{
  res.status(404).send('Page not found.');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});