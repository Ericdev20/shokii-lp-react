import { useState, type FormEvent } from 'react';

interface FormErrors {
  nom?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const nom = (formData.get('nom') as string)?.trim() ?? '';
    const email = (formData.get('email') as string)?.trim() ?? '';
    const message = (formData.get('message') as string)?.trim() ?? '';

    const newErrors: FormErrors = {};

    if (!nom) {
      newErrors.nom = 'Veuillez entrer votre nom.';
    }

    if (!email) {
      newErrors.email = 'Veuillez entrer votre email.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Adresse email invalide.';
    }

    if (!message) {
      newErrors.message = 'Veuillez entrer votre message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3500);
    }, 1200);
  };

  const handleFieldChange = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">

          <h2 className="section-title">Contactez-nous</h2>
          <p className="section-subtitle">
            Nous sommes là pour vous aider. Contactez-nous pour toutes vos questions.
          </p>
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Votre nom"
                  style={errors.nom ? { borderColor: '#FF1F78', boxShadow: '0 0 0 4px rgba(255,31,120,0.12)' } : undefined}
                  onChange={() => handleFieldChange('nom')}
                />
                {errors.nom && (
                  <span className="form-error" role="alert" style={{ display: 'block', color: '#FF1F78', fontSize: '0.78rem', marginTop: '4px' }}>
                    {errors.nom}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre email"
                  style={errors.email ? { borderColor: '#FF1F78', boxShadow: '0 0 0 4px rgba(255,31,120,0.12)' } : undefined}
                  onChange={() => handleFieldChange('email')}
                />
                {errors.email && (
                  <span className="form-error" role="alert" style={{ display: 'block', color: '#FF1F78', fontSize: '0.78rem', marginTop: '4px' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone <span style={{ fontWeight: 400, opacity: 0.6 }}>(optionnel)</span></label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  placeholder="Votre téléphone"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group--full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Votre message"
                  style={errors.message ? { borderColor: '#FF1F78', boxShadow: '0 0 0 4px rgba(255,31,120,0.12)' } : undefined}
                  onChange={() => handleFieldChange('message')}
                />
                {errors.message && (
                  <span className="form-error" role="alert" style={{ display: 'block', color: '#FF1F78', fontSize: '0.78rem', marginTop: '4px' }}>
                    {errors.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="btn btn--gradient"
                disabled={isSubmitting}
                style={isSubmitted ? { background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 18px rgba(34,197,94,0.35)' } : undefined}
              >
                {isSubmitting ? 'Envoi en cours…' : isSubmitted ? '✓ Message envoyé !' : 'Envoyer'}
              </button>
            </div>
          </form>
      </div>
    </section>
  );
}
