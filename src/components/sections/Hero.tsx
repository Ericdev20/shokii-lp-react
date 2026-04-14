import { Reveal, StoreButton } from '../ui';

export function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal>
            <h1>
              Trouvez l&apos;amour<br />
              avec <span className="gradient-text">Shokii !</span>
            </h1>
            <p>
              Rejoignez des milliers de célibataires et connectez-vous avec des
              personnes qui partagent vos valeurs. Shokii, l&apos;application de
              rencontres qui vous correspond vraiment.
            </p>
          </Reveal>
        </div>

        <div className="hero__visual">
          <div className="hero__ellipse" aria-hidden="true">
            <img src="/assets/Ellipse 1.png" alt="" />
          </div>
          <div className="hero__phones">
            <div>
              <img src="/assets/feat1.png" alt="Application Shokii sur un téléphone" className="hero__phone-1" />
            </div>
            <div>
              <img src="/assets/feat2.png" alt="Application Shokii sur un deuxième téléphone" className="hero__phone-2" />
            </div>
          </div>
        </div>

        <div className="hero__buttons">
          <StoreButton
            iconSrc="/assets/playstore.png"
            smallLabel="Disponible sur"
            mainLabel="Google Play"
            href="#"
            aria-label="Télécharger sur Google Play"
          />
          <StoreButton
            iconSrc="/assets/Apple_Store_logo.png"
            smallLabel="Télécharger sur"
            mainLabel="App Store"
            href="#"
            aria-label="Télécharger sur App Store"
          />
        </div>
      </div>
    </section>
  );
}
