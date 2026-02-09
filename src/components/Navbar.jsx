import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CameraLogo from "./CameraLogo";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&page=1`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <CameraLogo size="small" />
        <span className="navbar__title">The Magnificent Movie Search</span>
      </Link>

      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="toggle__bar"></span>
        <span className="toggle__bar"></span>
        <span className="toggle__bar"></span>
      </button>

      <div className={`navbar__menu ${menuOpen ? "navbar__menu--open" : ""}`}>
        <ul className="navbar__links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Search
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSearch} className="navbar__search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="navbar__input"
          />
          <button type="submit" className="navbar__button">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
