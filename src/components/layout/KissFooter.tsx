import { Link } from 'react-router-dom';

export function KissFooter() {
  return (
    <footer className="kiss-footer">
      <div className="container kiss-footer__inner">
        <div className="kiss-footer__links">
          <Link to="/">Accueil</Link>
          <a href="/#a-propos">À propos</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Conditions d&apos;utilisation</a>
        </div>
        <div className="kiss-footer__contact">
          <a href="mailto:contact@shokii.com">contact@shokii.com</a>
          <a href="tel:+2290152165555">+229 01 52 16 55 55</a>
        </div>
        <p className="kiss-footer__copy">&copy; 2026 Shokii. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
