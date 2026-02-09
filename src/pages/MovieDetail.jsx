// src/pages/MovieDetail.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&plot=full&apikey=544e1ad3`
        );
        const data = await response.json();
        
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="page movie-detail">
        <div className="movie-detail__card">
          <div className="movie-detail__skeleton">
            <div className="skeleton__poster skeleton__poster--large"></div>
            <div className="movie-detail__info">
              <div className="skeleton__text skeleton__text--title"></div>
              <div className="skeleton__text"></div>
              <div className="skeleton__text"></div>
              <div className="skeleton__text skeleton__text--long"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page movie-detail">
        <div className="movie-detail__card">
          <div className="error__container">
            <p className="error__message">{error}</p>
            <button onClick={() => navigate('/')} className="button button--primary">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="page movie-detail">
      <div className="movie-detail__card">
        {/* Back Button - Top Left */}
        <button onClick={handleBack} className="back__button">
          ← Back
        </button>

        <div className="movie-detail__content">
          {/* Poster */}
          <div className="movie-detail__poster">
            {movie.Poster && movie.Poster !== 'N/A' && !posterError ? (
              <img 
                src={movie.Poster} 
                alt={`${movie.Title} poster`}
                className="poster__image poster__image--large"
                onError={() => setPosterError(true)}
              />
            ) : (
              <div className="poster__placeholder poster__placeholder--large">
                <span className="poster__icon poster__icon--large">🎬</span>
                <h4 className="poster__title">{movie.Title}</h4>
                <span className="poster__year">{movie.Year}</span>
                <span className="poster__label">Poster Not Available</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.Title}</h1>
            
            <div className="movie-detail__meta">
              <span className="meta__item meta__item--year">{movie.Year}</span>
              <span className="meta__item meta__item--rated">{movie.Rated}</span>
              <span className="meta__item meta__item--runtime">{movie.Runtime}</span>
            </div>

            <div className="movie-detail__ratings">
              {movie.Ratings && movie.Ratings.map((rating, index) => (
                <div key={index} className="rating__item">
                  <span className="rating__source">{rating.Source}</span>
                  <span className="rating__value">{rating.Value}</span>
                </div>
              ))}
            </div>

            <div className="movie-detail__section">
              <h3 className="section__title">Plot</h3>
              <p className="section__content">{movie.Plot}</p>
            </div>

            <div className="movie-detail__grid">
              <div className="movie-detail__section">
                <h3 className="section__title">Director</h3>
                <p className="section__content">{movie.Director}</p>
              </div>

              <div className="movie-detail__section">
                <h3 className="section__title">Genre</h3>
                <p className="section__content">{movie.Genre}</p>
              </div>

              <div className="movie-detail__section">
                <h3 className="section__title">Released</h3>
                <p className="section__content">{movie.Released}</p>
              </div>

              <div className="movie-detail__section">
                <h3 className="section__title">Actors</h3>
                <p className="section__content">{movie.Actors}</p>
              </div>
            </div>

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="movie-detail__section movie-detail__section--awards">
                <h3 className="section__title">Awards</h3>
                <p className="section__content section__content--awards">{movie.Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;