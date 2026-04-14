import { Reveal } from '../ui';
import { steps } from '../../constants/steps';

export function HowItWorks() {
  return (
    <section className="how-it-works" id="comment-ca-marche">
      <div className="container how-it-works__inner">
        <div className="how-it-works__image">
          <Reveal>
            <img
              src="/assets/young-african-american-girl-wearing-casual-clothes-glasses-amazed-smiling-camera-while-presenting-with-hand-pointing-with-finger.png"
              alt="Utilisatrice Shokii souriante"
            />
          </Reveal>
        </div>

        <div className="how-it-works__content">
          <Reveal>
            <h2>Comment ça<br />marche?</h2>

            <ol className="steps" aria-label="Étapes pour utiliser Shokii">
              {steps.map((step) => (
                <li key={step.number} className="step">
                  <div className="step__number" aria-hidden="true">
                    {step.number}
                  </div>
                  <div className="step__text">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
