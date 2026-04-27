import { useTranslation } from '../../hooks/useTranslation';
import type { SessionUser } from '../../services/sessionApi';

interface SessionLoadingProps {
  message?: string;
}

export function SessionLoading({ message }: SessionLoadingProps) {
  const { t } = useTranslation();
  const defaultMessage = t('session.loading');
  
  return (
    <div className="session-status session-status--loading">
      <div className="session-loading">
        <i className="fa-solid fa-circle-notch fa-spin" />
        <span>{message || defaultMessage}</span>
      </div>
    </div>
  );
}

interface SessionErrorProps {
  message: string;
}

export function SessionError({ message }: SessionErrorProps) {
  const { t } = useTranslation();
  
  return (
    <div className="session-status session-status--error">
      <div className="session-error">
        <div className="session-error__icon">
          <i className="fa-solid fa-exclamation-triangle" />
        </div>
        <div className="session-error__content">
          <h3>{t('session.invalid')}</h3>
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        <div className="session-error__actions">
          <a href="/" className="btn btn--secondary">
            {t('session.backHome')}
          </a>
        </div>
      </div>
    </div>
  );
}

interface UserInfoProps {
  user: SessionUser;
}

function toUcFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="session-user-compact">
      <i className="fa-solid fa-user" />
      <span className="session-user-compact__name">{toUcFirst(user.pseudo)}</span>
      <span className="session-user-compact__separator">•</span>
      <span className="session-user-compact__email">{user.email}</span>
    </div>
  );
}