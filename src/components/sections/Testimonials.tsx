import { useRef, useState, useEffect, useCallback } from 'react';
import { Reveal } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';
import type { Testimonial } from '../../types';

const testimonialsFr: Testimonial[] = [
  {
    username: 'Marie',
    age: 28,
    quote: "J'ai trouvé mon âme sœur sur Shokii ! L'app est super facile à utiliser.",
    avatarInitial: 'M',
    avatarBg: 'linear-gradient(135deg, #FF6B9D, #C77DFF)',
  },
  {
    username: 'Jean',
    age: 32,
    quote: "Incroyable, j'ai matché avec quelqu'un qui partage mes intérêts !",
    avatarInitial: 'J',
    avatarBg: 'linear-gradient(135deg, #FF3F8E, #A333C8)',
  },
  {
    username: 'Sophie',
    age: 25,
    quote: "Merci Shokii, je suis en couple grâce à vous !",
    avatarInitial: 'S',
    avatarBg: 'linear-gradient(135deg, #FF1F78, #8B2FC9)',
  },
];

const testimonialsEn: Testimonial[] = [
  {
    username: 'Marie',
    age: 28,
    quote: "I found my soulmate on Shokii! The app is super easy to use.",
    avatarInitial: 'M',
    avatarBg: 'linear-gradient(135deg, #FF6B9D, #C77DFF)',
  },
  {
    username: 'Jean',
    age: 32,
    quote: "Amazing, I matched with someone who shares my interests!",
    avatarInitial: 'J',
    avatarBg: 'linear-gradient(135deg, #FF3F8E, #A333C8)',
  },
  {
    username: 'Sophie',
    age: 25,
    quote: "Thanks Shokii, I'm in a relationship thanks to you!",
    avatarInitial: 'S',
    avatarBg: 'linear-gradient(135deg, #FF1F78, #8B2FC9)',
  },
];

export function Testimonials() {
  const { t, isFrench } = useTranslation();
  const currentTestimonials = isFrench ? testimonialsFr : testimonialsEn;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.testimonial-card') as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    const scrollAmount = cardWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    let next = track.scrollLeft + scrollAmount;
    if (next >= maxScroll - 10) {
      next = 0;
    }

    track.scrollTo({ left: next, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(scrollNext, 3000);
    return () => clearInterval(timer);
  }, [isPaused, scrollNext]);

  return (
    <section className="testimonials" id="temoignages">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t('landing.testimonials.title')}</h2>
        </Reveal>

        <Reveal>
          <div
            className="testimonials__slider"
            role="region"
            aria-label={t('landing.testimonials.aria.label')}
          >
            <div
              className="testimonials__track"
              ref={trackRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsPaused(false), 2000);
              }}
            >
              {currentTestimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className="testimonial-card"
                  aria-label={`${t('landing.testimonials.aria.item')} ${testimonial.username}`}
                >
                  <div className="testimonial-card__header">
                    <div
                      className="testimonial-card__avatar"
                      style={{ '--avatar-bg': testimonial.avatarBg } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      <span>{testimonial.avatarInitial}</span>
                    </div>
                    <div className="testimonial-card__meta">
                      <h3>{testimonial.username}</h3>
                      {testimonial.age && <span>{testimonial.age} {t('landing.testimonials.yearsOld')}</span>}
                    </div>
                  </div>
                  <div className="testimonial-card__stars" aria-label={t('landing.testimonials.aria.stars')} role="img">
                    <span aria-hidden="true">★★★★★</span>
                  </div>
                  <blockquote className="testimonial-card__quote">
                    <p>&quot;{testimonial.quote}&quot;</p>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="testimonials__cta">
            <p className="testimonials__cta-text">{t('landing.testimonials.subtitle')}</p>
            <a href="#download" className="btn btn--gradient">
              {t('landing.testimonials.cta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}