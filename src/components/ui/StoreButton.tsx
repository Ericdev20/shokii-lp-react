interface StoreButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  iconSrc: string;
  smallLabel: string;
  mainLabel: string;
  variant?: 'dark' | 'light' | 'footer';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function StoreButton({
  iconSrc,
  smallLabel,
  mainLabel,
  variant = 'dark',
  className = '',
  href,
  onClick,
  ...props
}: StoreButtonProps) {
  const variantClass = variant === 'light' ? 'store-btn--light' : variant === 'footer' ? 'footer__store-btn' : '';

  return (
    <a
      className={`store-btn ${variantClass} ${className}`.trim()}
      href={href || '#'}
      target="_blank"
      onClick={onClick}
      {...props}
    >
      <img src={iconSrc} alt="" aria-hidden="true" />
      <span>
        <small>{smallLabel}</small>
        {mainLabel}
      </span>
    </a>
  );
}
