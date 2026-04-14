import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export function Skeleton({
  width,
  height,
  borderRadius = '8px',
  className = '',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

interface SkeletonPlanCardProps {
  hasBadge?: boolean;
}

export function SkeletonPlanCard({ hasBadge = false }: SkeletonPlanCardProps) {
  return (
    <div className="kiss-plan skeleton-card">
      <div className="kiss-plan__inner">
        {hasBadge && (
          <div className="kiss-plan__badge skeleton-badge">
            <Skeleton width={100} height={20} borderRadius="4px" />
          </div>
        )}
        <Skeleton width={80} height={48} borderRadius="8px" className="skeleton-quantity" />
        <Skeleton width={50} height={24} borderRadius="4px" className="skeleton-label" />
        <Skeleton width={120} height={32} borderRadius="8px" className="skeleton-price" />
        <Skeleton width="90%" height={48} borderRadius="8px" className="skeleton-desc" />
        <Skeleton width={100} height={44} borderRadius="24px" className="skeleton-btn" />
      </div>
    </div>
  );
}
