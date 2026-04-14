import { forwardRef, type ReactNode, type HTMLAttributes, type ElementType } from 'react';
import { useReveal } from '../../hooks';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  staggerDelay?: number;
  className?: string;
}

export const Reveal = forwardRef<HTMLElement, RevealProps>(
  ({ children, as: Tag = 'div', staggerDelay = 0, className = '', ...props }, ref) => {
    const { ref: revealRef, isVisible } = useReveal(staggerDelay);

    // Combine refs
    const combinedRef = (node: HTMLElement | null) => {
      revealRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const classes = `reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim();

    return (
      <Tag ref={combinedRef} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Reveal.displayName = 'Reveal';
