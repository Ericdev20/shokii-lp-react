import { useRef, useState, useEffect, useCallback } from 'react';
import { Reveal } from '../ui';
import { testimonials, SIGNUP_URL } from '../../constants';

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.testimonial-card');
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
          <h2 className="section-title">
            Des milliers de rencontres ont commencé sur Shokii…<br />
            et certaines deviennent de vraies histoires d&apos;amour.
          </h2>
        </Reveal>

        <Reveal>
          <div
            className="testimonials__slider"
            role="region"
            aria-label="Témoignages d&apos;utilisateurs"
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
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className="testimonial-card"
                  aria-label={`Témoignage de ${testimonial.username}`}
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
                      {testimonial.age && <span>{testimonial.age} ans</span>}
                    </div>
                  </div>
                  <div className="testimonial-card__stars" aria-label="5 étoiles sur 5" role="img">
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
            <p className="testimonials__cta-text">
              Et si la prochaine rencontre était la vôtre ?
            </p>
            <a href={SIGNUP_URL} className="btn btn--gradient">
              Inscrivez-vous
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
