import { Reveal } from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';

const icons = ['fa-bolt', 'fa-gift', 'fa-crown', 'fa-star'];

export function KissWhyBuy() {
  const { t } = useTranslation();

  const reasons = [
    { title: t('kiss.why.cards.0.title'), description: t('kiss.why.cards.0.description') },
    { title: t('kiss.why.cards.1.title'), description: t('kiss.why.cards.1.description') },
    { title: t('kiss.why.cards.2.title'), description: t('kiss.why.cards.2.description') },
    { title: t('kiss.why.cards.3.title'), description: t('kiss.why.cards.3.description') },
  ];

  return (
    <section className="kiss-why">
      <div className="container">
        <Reveal>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            {t('kiss.why.title')}
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            {t('kiss.why.subtitle')}
          </p>
        </Reveal>

        <div className="kiss-why__grid">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} className="kiss-why__card">
              <div className="kiss-why__card-icon">
                <i className={`fa-solid ${icons[index]}`}></i>
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
