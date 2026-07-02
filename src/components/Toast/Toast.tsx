import type { ReactNode } from 'react';
import './Toast.css';

export type ToastStyle = 'informative' | 'danger' | 'success' | 'warning';

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="1.5" />
      <path d="M12 11v5M12 8v.01" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarningTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4l9 16H3l9-16z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10v4M12 16.5v.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M8.5 12.5l2.5 2.5 4.5-5"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#f97316" strokeWidth="1.5" />
      <path d="M12 8v5M12 15.5v.01" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const defaultIcons: Record<ToastStyle, ReactNode> = {
  informative: <InfoIcon />,
  danger: <WarningTriangleIcon />,
  success: <CheckCircleIcon />,
  warning: <WarningCircleIcon />,
};

export interface ToastProps {
  style?: ToastStyle;
  headline?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Set to false to hide the leading icon entirely. */
  showIcon?: boolean;
  action?: { label: string; onClick?: () => void };
  className?: string;
}

/**
 * Toast — from Figma node 6696:3284. Covers all 4 styles (Informative,
 * Danger, Success, Warning) and the optional trailing action button pulled
 * directly from Figma. This is the static banner visual only — mount/unmount
 * timing, stacking, and positioning are left to the consumer (e.g. a toast
 * host/provider), since Figma's frame only specifies the banner itself.
 */
export function Toast({
  style = 'informative',
  headline,
  description,
  icon,
  showIcon = true,
  action,
  className,
}: ToastProps) {
  return (
    <div
      className={['ds-toast', `ds-toast--${style}`, className].filter(Boolean).join(' ')}
      role="status"
    >
      {showIcon && <span className="ds-toast__icon">{icon ?? defaultIcons[style]}</span>}
      <div className="ds-toast__text">
        {headline && <p className="ds-toast__headline">{headline}</p>}
        {description && <p className="ds-toast__description">{description}</p>}
      </div>
      {action && (
        <button type="button" className="ds-toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
