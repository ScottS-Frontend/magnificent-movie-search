// src/pages/HomePage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&page=1`);
    }
  };

  return (
    <div className="page home-page">
      {/* First Line */}
      <h1 className="hero__title fade-in-up fade-in-up--delay-1">
        America's Most Awarded Movie Search Platform!
      </h1>

      {/* Camera Animation - BETWEEN the two lines */}
      <div className="camera__container fade-in-up fade-in-up--delay-2">
        <div className="tripod">
          <div className="tripod__leg tripod__leg--left"></div>
          <div className="tripod__leg tripod__leg--right"></div>
          <div className="tripod__leg tripod__leg--back"></div>
        </div>
        
        <div className="vintage-camera">
          <div className="camera__box">
            <div className="reel__assembly">
              <div className="reel reel--back">
                <div className="reel__spokes"></div>
              </div>
              <div className="reel reel--front">
                <div className="reel__spokes"></div>
              </div>
            </div>
            
            <div className="viewfinder__hump"></div>
            
            <div className="lens__housing">
              <div className="lens__barrel">
                <div className="lens__glass"></div>
              </div>
            </div>
            
            <div className="crank__handle">
              <div className="crank__arm"></div>
              <div className="crank__knob"></div>
            </div>
            
            <div className="projector__beam"></div>
          </div>
        </div>
      </div>

      {/* Second Line */}
      <h2 className="hero__subtitle fade-in-up fade-in-up--delay-3">
        Find all your favorite movies here!
      </h2>
      

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="home__search fade-in-up fade-in-up--delay-4">
        <input 
          type="text" 
          placeholder="Search for movies..."
          className="search__input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search__button">Search</button>
      </form>
    </div>
  );
}

export default HomePage;