import { useTranslation } from '../../hooks/useTranslation';

export function KissReassurance() {
  const { t } = useTranslation();

  const items = [
    { icon: 'fa-lock', text: t('kiss.reassurance.secure') },
    { icon: 'fa-bolt', text: t('kiss.reassurance.instant') },
    { icon: 'fa-headset', text: t('kiss.reassurance.support') },
  ];

  return (
    <section className="kiss-reassurance">
      <div className="container">
        
          <div className="kiss-reassurance__grid">
            {items.map((item) => (
              <div key={item.text} className="kiss-reassurance__item">
                <i className={`fa-solid ${item.icon}`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
}