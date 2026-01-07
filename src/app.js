require('dotenv').config();
// const path = require('path');
const express = require('express');
// const hbs = require('hbs');
const movieService = require('./utils/movieService');

const app = express();
const port = process.env.PORT || 8080;

// Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../templates/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
// app.set('view engine', 'hbs');
// app.set('views', viewsPath);
// hbs.registerPartials(partialsPath);

// Setup static directory to serve
// app.use(express.static(publicDirectoryPath));

// app.get('', (req, res) =>{
//   res.render('index', {
//     title: 'Viewing Party',
//     name: 'Renee Messersmith'
//   });
  
// });

app.get('/movies', (req, res) =>{
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});