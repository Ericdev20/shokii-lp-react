import { useState, type FormEvent } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface FormErrors {
  nom?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { t } = useTranslation();
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
      newErrors.nom = t('landing.contact.form.errors.nomRequired');
    }

    if (!email) {
      newErrors.email = t('landing.contact.form.errors.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('landing.contact.form.errors.emailInvalid');
    }

    if (!message) {
      newErrors.message = t('landing.contact.form.errors.messageRequired');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

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

          <h2 className="section-title">{t('landing.contact.title')}</h2>
          <p className="section-subtitle">{t('landing.contact.subtitle')}</p>
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">{t('landing.contact.form.nom')}</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder={t('landing.contact.form.nomPlaceholder')}
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
                <label htmlFor="prenom">{t('landing.contact.form.prenom')}</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder={t('landing.contact.form.prenomPlaceholder')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">{t('landing.contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('landing.contact.form.emailPlaceholder')}
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
                <label htmlFor="telephone">{t('landing.contact.form.telephone')} <span style={{ fontWeight: 400, opacity: 0.6 }}>({t('common.optional')})</span></label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  placeholder={t('landing.contact.form.telephonePlaceholder')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group--full">
                <label htmlFor="message">{t('landing.contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t('landing.contact.form.messagePlaceholder')}
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
                {isSubmitting 
                  ? t('landing.contact.form.submitting') 
                  : isSubmitted 
                    ? t('landing.contact.form.success') 
                    : t('landing.contact.form.submit')
                }
              </button>
            </div>
          </form>
      </div>
    </section>
  );
}