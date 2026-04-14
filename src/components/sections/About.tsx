import { Reveal } from '../ui';
import { aboutCards, SIGNUP_URL } from '../../constants';

export function About() {
  return (
    <section className="about" id="a-propos">
      <div className="container about__inner">
        <div className="about__left">
          <Reveal>
            <h2 className="section-title">A Propos</h2>
            <div className="about__text">
              <p>
                Shokii est une application de rencontres conçue pour connecter les
                célibataires en Afrique et leur permettre de trouver l&apos;amour, faire
                de nouvelles rencontres et créer de vraies connexions.
              </p>
              <p>
                Avec plus de <strong>1 000 000 d&apos;utilisateurs actifs</strong>,
                Shokii réunit une communauté dynamique de célibataires hommes et
                femmes à la recherche de relations authentiques.
              </p>
              <p>
                L&apos;application est disponible en <strong>français, anglais, espagnol
                et portugais</strong>, afin de faciliter les rencontres entre
                différentes cultures.
              </p>
              <p>
                Grâce à un algorithme intelligent et des outils de sécurité avancés,
                nous offrons une expérience de rencontre simple, sécurisée et
                agréable. Rejoignez Shokii et commencez votre histoire dès
                aujourd&apos;hui.
              </p>
            </div>
            {/* <div className="about__cta">
              <a href="#contact" className="btn btn--gradient">Contactez-nous</a>
            </div> */}
          </Reveal>
        </div>

        <div className="about__right">
          <div className="about__cards">
            {aboutCards.map((card, index) => (
              <Reveal key={index} staggerDelay={index * 100} className="d-inline-grid">
                <div className="about-card">
                  <div className="about-card__icon">
                    <img src={card.icon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
