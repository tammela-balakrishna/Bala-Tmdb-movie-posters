const API_KEY = "85223745366431bf4ecec41321a70e01";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.getElementById('form');
const search = document.getElementById('searchbar');
const main = document.getElementById('main');


const apifetch = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || []; 
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

const displayMovies = (movies) => {
  main.innerHTML = ''; 
  if (movies.length > 0) {
    movies.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movieCard');

      const image = document.createElement('img');
      image.src = movie.poster_path ? IMG_PATH + movie.poster_path : 'placeholder.jpg'; 
      image.alt = movie.title;

      const movieTitle = document.createElement('h2');
      movieTitle.innerHTML = movie.title;

      movieCard.appendChild(image);
      movieCard.appendChild(movieTitle);
      main.appendChild(movieCard);
    });
  } else {
    main.innerHTML = `<h2>Movie not found</h2>`; 
  }
};


apifetch(API_URL).then(displayMovies);


const handleSearch = (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) return;
  
  apifetch(SEARCH_API + searchTerm).then(displayMovies);
  search.value = '';
};


form.addEventListener('submit', handleSearch);
