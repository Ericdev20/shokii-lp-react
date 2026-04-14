import { Reveal } from '../ui/Reveal';

const items = [
  { icon: 'fa-lock', text: 'Paiement 100% sécurisé' },
  { icon: 'fa-bolt', text: 'KISS crédités instantanément' },
  { icon: 'fa-headset', text: 'Support disponible 24h/24' },
];

export function KissReassurance() {
  return (
    <section className="kiss-reassurance">
      <div className="container">
        <Reveal>
          <div className="kiss-reassurance__grid">
            {items.map((item) => (
              <div key={item.text} className="kiss-reassurance__item">
                <i className={`fa-solid ${item.icon}`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
