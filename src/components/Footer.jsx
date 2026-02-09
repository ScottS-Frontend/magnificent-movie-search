import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Magnificent Movie Search</h3>
          <p className="footer__text">Find your favorite films in seconds.</p>
          <div className="footer__socials">
            <a href="#" className="social__link" aria-label="Facebook">
              f
            </a>
            <a href="#" className="social__link" aria-label="Twitter">
              t
            </a>
            <a href="#" className="social__link" aria-label="GitHub">
              g
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Search</a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Tech</h3>
          <ul className="footer__tech">
            <li>OMDB API</li>
            <li>React</li>
            <li>React Router</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {currentYear} Scott Slagle | Magnificent Movie Search | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
