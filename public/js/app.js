// Search Functionality
const searchForm = document.querySelector('.search-form');
const search = document.querySelector('.search-form__input');
const resultsTitle = document.querySelector('.results__title');
const resultsBox = document.querySelector('.results__wrapper');
const message = document.querySelector('.results__message');

// Popular Movies Section
const popularMoviesContainer = document.querySelector('.popular__posters');
const wrapper = document.querySelector('.popular__posters-wrapper');
const prevBtn = document.querySelector('.popular__prev');
const nextBtn = document.querySelector('.popular__next');
const popularMessage = document.querySelector('.popular__message');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/movies/popular')
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        popularMessage.textContent = data.error;
      } else {
        renderPopularMovies(data);
      }
    });
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const movieTitle = search.value;
  message.textContent = 'Loading...';

  fetch(`/movies?title=${movieTitle}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      message.textContent = data.error;
      resultsBox.innerHTML = '';
      resultsTitle.textContent = '';
    } else {
      message.textContent = '';
      renderSearchResults(data);
    }
  });
});

function renderSearchResults(movies) {
  resultsBox.innerHTML = '';

  resultsTitle.textContent = `Movies Similar to ${movies.title}`;
  
  movies.results.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const title = document.createElement('h3');
    title.textContent = movie.title;
    title.className = 'movie-card__title';

    const img = document.createElement('img');
    img.className = 'movie-card__img';

    img.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/img/placeholder.png';
    img.alt = movie.title;

    card.append(img, title);
    resultsBox.appendChild(card);
  })
}

function renderPopularMovies(movies) {
  popularMoviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const title = document.createElement('h3');
    title.textContent = movie.title;
    title.className = 'movie-card__title';

    const img = document.createElement('img');
    img.className = 'movie-card__img';

    img.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/img/placeholder.png';
    img.alt = movie.title;

    card.append(img, title);
    popularMoviesContainer.appendChild(card);
  })
}

const scrollAmount = 500;
prevBtn.addEventListener('click', () => {
  wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
  wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
