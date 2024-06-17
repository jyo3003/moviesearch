import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const movies = [
  { title: 'The Matrix', rating: 7.5, category: 'Action' },
  { title: 'Focus', rating: 6.9, category: 'Comedy' },
  { title: 'The Lazarus Effect', rating: 6.4, category: 'Thriller' },
  { title: 'Everly', rating: 5.0, category: 'Action' },
  { title: 'Maps to the Stars', rating: 7.5, category: 'Drama' },
];

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...prevRatings, rating]
    );
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(Math.round(movie.rating));
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(movie.category);
    return matchesSearchTerm && matchesRating && matchesGenre;
  });

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <div className="search-filter-box">
        <input
          type="text"
          placeholder="Enter movie name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="dropdown">
          <button
            onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
          >
            Rating {isRatingDropdownOpen ? '▲' : '▼'}
          </button>
          {isRatingDropdownOpen && (
            <RatingFilter
              selectedRatings={selectedRatings}
              onRatingChange={handleRatingChange}
            />
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}>
            Genre {isGenreDropdownOpen ? '▲' : '▼'}
          </button>
          {isGenreDropdownOpen && (
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreChange={handleGenreChange}
            />
          )}
        </div>
      </div>
      {searchTerm && <MovieList movies={filteredMovies} />}
    </div>
  );
};

const RatingFilter = ({ selectedRatings, onRatingChange }) => {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="dropdown-content">
      <label>
        <input
          type="checkbox"
          checked={selectedRatings.length === 0}
          onChange={() => onRatingChange(0)}
        />
        Any rating
      </label>
      {ratings.map((rating) => (
        <label key={rating}>
          <input
            type="checkbox"
            checked={selectedRatings.includes(rating)}
            onChange={() => onRatingChange(rating)}
          />
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={i < rating ? 'filled' : ''}>
              ★
            </span>
          ))}
        </label>
      ))}
    </div>
  );
};

const GenreFilter = ({ selectedGenres, onGenreChange }) => {
  const genres = ['Action', 'Comedy', 'Thriller', 'Drama'];
  return (
    <div className="dropdown-content">
      {genres.map((genre) => (
        <label key={genre}>
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => onGenreChange(genre)}
          />
          {genre}
        </label>
      ))}
    </div>
  );
};

const MovieList = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.title} className="movie-item">
          <div className="movie-details">
            <div>
              <h4>{movie.title}</h4>
              <div className="star-rating">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className={i < movie.rating ? 'filled' : ''}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="movie-category">{movie.category}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieSearch;
