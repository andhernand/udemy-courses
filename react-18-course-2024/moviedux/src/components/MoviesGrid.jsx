import { useState } from 'react';
import MovieCard from './MovieCard';

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [rating, setRating] = useState('All Ratings');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === 'All Genres' ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case 'All Ratings':
        return true;

      case 'Good':
        return movie.rating >= 8;

      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;

      case 'Bad':
        return movie.rating < 5;

      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        id="movie-search"
        name="movie-search"
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="genre-filter">Genre</label>
          <select
            id="genre-filter"
            name="genre"
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label htmlFor="rating-filter">Rating</label>
          <select
            id="rating-filter"
            name="rating"
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All Ratings</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={watchlist.includes(movie.id)}
            />
          ))}
      </div>
    </div>
  );
}
