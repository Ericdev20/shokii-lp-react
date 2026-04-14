import { Reveal, StoreButton } from '../ui';

export function Download() {
  return (
    <section className="download">
      <div className="container download__inner">
        <div className="download__content">
          <Reveal>
            <h2>Téléchargez<br />maintenant</h2>
            <p>
              Rejoignez-nous sur notre application mobile. Créez un compte
              gratuitement et commencez dès maintenant à trouver l&apos;amour.
            </p>
            <div className="download__buttons">
              <StoreButton
                iconSrc="/assets/playstore.png"
                smallLabel="Disponible sur"
                mainLabel="Google Play"
                href="#"
                aria-label="Télécharger sur Google Play"
                variant="light"
              />
              <StoreButton
                iconSrc="/assets/Apple_Store_logo.png"
                smallLabel="Télécharger sur"
                mainLabel="App Store"
                href="#"
                aria-label="Télécharger sur App Store"
                variant="light"
              />
            </div>
          </Reveal>
        </div>

        <div className="download__visual">
          <Reveal>
            <img src="/assets/Group 25 (1).png" alt="Shokii sur mobile" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
