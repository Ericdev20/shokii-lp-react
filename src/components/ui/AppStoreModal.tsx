import { useTranslation } from '../../hooks/useTranslation';

interface AppStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppStoreModal({ isOpen, onClose }: AppStoreModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="app-store-modal__backdrop"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="app-store-modal" role="dialog" aria-modal="true" aria-labelledby="app-store-modal-title">
        <div className="app-store-modal__content">
          {/* Close button */}
          <button
            className="app-store-modal__close"
            onClick={onClose}
            aria-label={t('modal.appStore.close')}
          >
            ✕
          </button>

          {/* Message */}
          <div className="app-store-modal__header">
            <img src="/assets/pomme.png" alt="" className="app-store-modal__icon" />
            <h2 id="app-store-modal-title" className="app-store-modal__title">
              {t('modal.appStore.title')}
            </h2>
          </div>

          {/* Actions */}
          <div className="app-store-modal__actions">
            <a
              href="https://shokii.com/"
              className="btn btn--gradient"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {t('modal.appStore.continueWeb')}
            </a>
            <button
              className="btn btn--outline"
              onClick={onClose}
            >
              {t('modal.appStore.close')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
