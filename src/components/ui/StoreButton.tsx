import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface StoreButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  iconSrc: string;
  smallLabel: string;
  mainLabel: string;
  variant?: 'dark' | 'light' | 'footer';
}

export function StoreButton({
  iconSrc,
  smallLabel,
  mainLabel,
  variant = 'dark',
  className = '',
  ...props
}: StoreButtonProps) {
  const variantClass = variant === 'light' ? 'store-btn--light' : variant === 'footer' ? 'footer__store-btn' : '';

  return (
    <a className={`store-btn ${variantClass} ${className}`.trim()} {...props}>
      <img src={iconSrc} alt="" aria-hidden="true" />
      <span>
        <small>{smallLabel}</small>
        {mainLabel}
      </span>
    </a>
  );
}
