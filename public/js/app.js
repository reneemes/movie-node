const popularMoviesContainer = document.querySelector('.popular__posters');
const wrapper = document.querySelector('.popular__posters-wrapper');
const prevBtn = document.querySelector('.popular__prev');
const nextBtn = document.querySelector('.popular__next');

document.addEventListener('DOMContentLoaded', () => {

  fetch('/movies/popular')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch popular movies');
      return response.json();
    })
    .then(data => renderPopularMovies(data));
});


function renderPopularMovies(movies) {
  popularMoviesContainer.innerHTML = '';
  // console.log(movies);
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

// Scroll buttons
const scrollAmount = 300; // pixels per click
prevBtn?.addEventListener('click', () => {
  wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
nextBtn?.addEventListener('click', () => {
  wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});


// fetch(`/movies?title=shrek`)
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.error) {
//       // display error
//     } else {
//       // display movies
//     }
//   });