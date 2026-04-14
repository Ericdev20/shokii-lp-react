import { footerNavItems, footerHelpItems } from '../../constants/nav';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <h4>Liens utiles</h4>
          <ul>
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Aide et support</h4>
          <ul>
            {footerHelpItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contactez-nous</h4>
          <ul>
            <li>
              <a href="mailto:contact@shokii.com">contact@shokii.com</a>
            </li>
            <li>
              <a href="tel:+2290152165555">+229 01 52 16 55 55</a>
            </li>
          </ul>
          <div className="footer__stores">
            <a href="#" className="footer__store-btn" aria-label="Télécharger sur Google Play">
              <img src="/assets/playstore.png" alt="" aria-hidden="true" />
              <span>
                <small>Disponible sur</small>
                Google Play
              </span>
            </a>
            <a href="#" className="footer__store-btn" aria-label="Télécharger sur App Store">
              <img src="/assets/app-store.png" alt="" aria-hidden="true" />
              <span>
                <small>Télécharger sur</small>
                App Store
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <img src="/assets/shokii.png" alt="Shokii" className="footer__logo" />
          <p>&copy; 2026 Shokii. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
