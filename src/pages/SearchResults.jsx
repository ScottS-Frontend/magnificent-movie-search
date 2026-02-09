// src/pages/SearchResults.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./SearchResults.css";

// Sorters (module scope so it doesn't recreate every render)
const SORTERS = {
  titleAsc: (a, b) => a.Title.localeCompare(b.Title),
  titleDesc: (a, b) => b.Title.localeCompare(a.Title),
  yearAsc: (a, b) => Number(a.Year) - Number(b.Year),
  yearDesc: (a, b) => Number(b.Year) - Number(a.Year),
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [sortValue, setSortValue] = useState("");

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  // Fetch movies
  useEffect(() => {
    if (!query) {
      setLoading(false);
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    if (!apiKey) {
      setLoading(false);
      setMovies([]);
      setTotalResults(0);
      setError(
        "Missing OMDb API key. Set REACT_APP_OMDB_API_KEY in your environment variables.",
      );
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
          query,
        )}&page=${page}&type=movie&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Search failed.");
        }

        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      } catch (err) {
        setError(err?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page, apiKey]);

  // Sort movies
  const sortedMovies = useMemo(() => {
    if (!sortValue || !SORTERS[sortValue]) return movies;
    return [...movies].sort(SORTERS[sortValue]);
  }, [movies, sortValue]);

  const totalPages = Math.ceil(totalResults / 10);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  if (loading) {
    return (
      <div className="page search-results">
        <h2 className="search-results__title">Search results for: "{query}"</h2>
        <div className="results__grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton__card">
              <div className="skeleton__poster"></div>
              <div className="skeleton__text"></div>
              <div className="skeleton__text skeleton__text--short"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page search-results">
        <h2 className="search-results__title">Search results for: "{query}"</h2>
        <p className="error__message">{error}</p>
      </div>
    );
  }

  return (
    <div className="page search-results">
      <h2 className="search-results__title">Search results for: "{query}"</h2>
      <p className="results__count">{totalResults} results found</p>

      {/* Sort Bar */}
      {movies.length > 0 && (
        <div className="sort__bar">
          <label htmlFor="sort" className="sort__label">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortValue}
            onChange={handleSortChange}
            className="sort__select"
          >
            <option value="">-- choose --</option>
            <option value="titleAsc">Title A–Z</option>
            <option value="titleDesc">Title Z–A</option>
            <option value="yearAsc">Year (oldest)</option>
            <option value="yearDesc">Year (newest)</option>
          </select>
        </div>
      )}

      <div className="results__grid">
        {sortedMovies.slice(0, 6).map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="movie__card"
          >
            <Poster
              image={movie.Poster}
              title={movie.Title}
              year={movie.Year}
            />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <Link
            to={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
            className={
              page <= 1
                ? "pagination__link pagination__link--disabled"
                : "pagination__link"
            }
            onClick={(e) => page <= 1 && e.preventDefault()}
            aria-disabled={page <= 1}
          >
            ← Previous
          </Link>

          <span className="pagination__info">
            Page {page} of {totalPages}
          </span>

          <Link
            to={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
            className={
              page >= totalPages
                ? "pagination__link pagination__link--disabled"
                : "pagination__link"
            }
            onClick={(e) => page >= totalPages && e.preventDefault()}
            aria-disabled={page >= totalPages}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  );
}

function Poster({ image, title, year }) {
  const [error, setError] = useState(false);

  const showPlaceholder = !image || image === "N/A" || error;

  return (
    <div className="poster__container">
      {!showPlaceholder && (
        <img
          src={image}
          alt={`${title} poster`}
          loading="lazy"
          className="poster__image"
          onError={() => setError(true)}
        />
      )}

      {showPlaceholder && (
        <div className="poster__placeholder">
          <span className="poster__icon">🎬</span>
          <h4 className="poster__title">{title}</h4>
          <span className="poster__year">{year}</span>
          <span className="poster__label">Poster Not Available</span>
        </div>
      )}

      <div className="hover__info">
        <h3 className="hover__title">{title}</h3>
        <p className="hover__year">{year}</p>
        <span className="hover__button">More Info →</span>
      </div>
    </div>
  );
}

export default SearchResults;
