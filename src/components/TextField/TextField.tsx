import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Small label above the field, e.g. "Header title". */
  label?: ReactNode;
  /** Trailing text on the label row, e.g. a character counter or "Optional". */
  detail?: ReactNode;
  /** Helper text below the field. Replaced by `errorText` when `error` is true. */
  helperText?: ReactNode;
  /** Shown instead of `helperText` when `error` is true. */
  errorText?: ReactNode;
  error?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/**
 * TextField — from Figma node 5487:6208. A real <input> styled to match the
 * "Standard" style across Default/Hover/Focused/Disabled states and the
 * Error variant. The optional label row and footer map to Figma's
 * "Section Header" / "Section Footer" slots.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      detail,
      helperText,
      errorText,
      error = false,
      leadingIcon,
      trailingIcon,
      disabled,
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const footer = error ? (errorText ?? helperText) : helperText;

    return (
      <div className={['ds-text-field', className].filter(Boolean).join(' ')}>
        {(label || detail) && (
          <div className="ds-text-field__header">
            {label && (
              <label htmlFor={inputId} className="ds-text-field__label">
                {label}
              </label>
            )}
            {detail && <span className="ds-text-field__detail">{detail}</span>}
          </div>
        )}
        <div
          className={[
            'ds-text-field__field',
            error && 'ds-text-field__field--error',
            disabled && 'ds-text-field__field--disabled',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {leadingIcon && <span className="ds-text-field__icon">{leadingIcon}</span>}
          <input
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error || undefined}
            className="ds-text-field__input"
          />
          {trailingIcon && <span className="ds-text-field__icon">{trailingIcon}</span>}
        </div>
        {footer && (
          <div
            className={['ds-text-field__footer', error && 'ds-text-field__footer--error']
              .filter(Boolean)
              .join(' ')}
          >
            {footer}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
