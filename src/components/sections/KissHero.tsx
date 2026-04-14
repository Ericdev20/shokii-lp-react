import { Reveal } from '../ui/Reveal';

export function KissHero() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="kiss-hero" id="top">
      <div className="container kiss-hero__inner">
        <div className="kiss-hero__content">
          <Reveal as="h1">
            Recharge tes <span className="gradient-text">KISS</span>,<br />
            vis des moments uniques
          </Reveal>
          <Reveal>
            <p>
              Les KISS sont la monnaie de Shokii. Utilise-les pour envoyer des cadeaux,
              booster ton profil, accéder à des fonctionnalités exclusives et bien plus.
            </p>
          </Reveal>
          <Reveal>
            <div className="kiss-hero__trust">
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Paiement sécurisé</span>
              </div>
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-users"></i>
                <span>1M+ utilisateurs</span>
              </div>
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-clock"></i>
                <span>Disponible 24h/24</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <button onClick={scrollToPlans} className="btn btn--gradient kiss-hero__cta">
              Découvrir les packs
            </button>
          </Reveal>
        </div>
        <Reveal className="kiss-hero__visual">
          {/* <div className="kiss-hero__coin">
            <i className="fa-solid fa-heart"></i>
          </div> */}
          <img src="/assets/hero-pricing.png" alt="Illustration de KISS" className="kiss-hero__image" />
        </Reveal>
      </div>
    </section>
  );
}
