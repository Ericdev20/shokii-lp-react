import { Reveal } from '../ui/Reveal';

const reasons = [
  { icon: 'fa-bolt', title: 'Booste ton profil', description: 'Utilise tes KISS pour apparaître en tête des résultats et multiplier tes matchs.' },
  { icon: 'fa-gift', title: 'Envoie des cadeaux', description: 'Offre des cadeaux virtuels à tes matchs et démarque-toi avec style.' },
  { icon: 'fa-crown', title: 'Accès premium', description: 'Débloque des fonctionnalités exclusives comme le mode incognito et les Super Likes.' },
  { icon: 'fa-star', title: 'Super Likes', description: 'Montre un intérêt fort avec des Super Likes et augmente tes chances de match.' },
];

export function KissWhyBuy() {
  return (
    <section className="kiss-why">
      <div className="container">
        <Reveal>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Pourquoi acheter des KISS ?
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Les KISS te donnent accès à un monde de possibilités sur Shokii.
          </p>
        </Reveal>

        <div className="kiss-why__grid">
          {reasons.map((reason) => (
            <Reveal key={reason.title} className="kiss-why__card">
              <div className="kiss-why__card-icon">
                <i className={`fa-solid ${reason.icon}`}></i>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
