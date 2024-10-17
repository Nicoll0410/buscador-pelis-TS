// Definimos los tipos que usaremos
interface Movie {
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
}

const searchButton = document.getElementById('searchButton') as HTMLElement;
const results = document.getElementById('results') as HTMLElement;
const api_key = '45d7bfc50f80e5122d9d22192cc90321';
const urlBase = 'https://api.themoviedb.org/3/search/movie';
const urlImg = 'https://image.tmdb.org/t/p/w200';

searchButton.addEventListener('click', searchMovies);

function searchMovies(): void {
    results.innerHTML = 'Cargando...';
    const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMovies(movies: Movie[]): void {
    results.innerHTML = '';

    if (movies.length === 0) {
        results.innerHTML = '<p>No se encontraron resultados de tu búsqueda</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const releaseDate = document.createElement('h2');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        const poster_path = movie.poster_path ? `${urlImg}${movie.poster_path}` : '';
        const poster = document.createElement('img');
        if (poster_path) {
            poster.src = poster_path;
        } else {
            poster.alt = 'No image available';
        }

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        results.appendChild(movieDiv);
    });
}
