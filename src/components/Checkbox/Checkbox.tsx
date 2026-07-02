import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  /** Text (or node) rendered next to the checkbox. */
  label?: ReactNode;
}

/**
 * Checkbox — a real <input type="checkbox"> visually replaced with a
 * token-driven box + checkmark. The native input stays in the DOM (just
 * visually hidden) instead of being reimplemented with a <div>, so keyboard
 * behavior, form participation, and screen readers all work for free.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, disabled, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <span className={['ds-checkbox', className].filter(Boolean).join(' ')}>
        <span className="ds-checkbox__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className="ds-checkbox__input"
          />
          <span className="ds-checkbox__box" aria-hidden="true">
            <svg
              className="ds-checkbox__checkmark"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        {label !== undefined && (
          <label htmlFor={inputId} className="ds-checkbox__label">
            {label}
          </label>
        )}
      </span>
    );
  },
);

Checkbox.displayName = 'Checkbox';
