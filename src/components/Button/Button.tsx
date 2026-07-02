import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Maps to `--component-button-{variant}-*` tokens. @default 'primary' */
  variant?: ButtonVariant;
  /** Size scale. Maps to `--component-button-{padding,height}-{size}` tokens. @default 'md' */
  size?: ButtonSize;
}

/**
 * Button — pill-shaped action control.
 *
 * Consumes CSS custom properties from `dist/tokens.css` exclusively (see
 * Button.css). No hardcoded colors or pixel values live in this component;
 * changing the token source and rebuilding is the only supported way to
 * restyle it.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', type = 'button', className, disabled, ...rest }, ref) => {
    const classNames = ['ds-button', `ds-button--${variant}`, `ds-button--${size}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
      />
    );
  },
);

Button.displayName = 'Button';
