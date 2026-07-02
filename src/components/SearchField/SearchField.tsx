import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './SearchField.css';

function MagnifyingGlassIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  label?: ReactNode;
  detail?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  /** Called when the clear (x) button is used to empty the field. */
  onClear?: () => void;
}

/**
 * SearchField — from Figma node 8250:4368. Figma documents it as the same
 * base pattern as Text field (both link to the same Adobe Spectrum doc), so
 * this component reuses Text field's `--component-text-field-*` tokens for
 * everything structurally identical (padding, radius, colors) and only
 * introduces new tokens for what's genuinely different: the darker
 * hover-when-filled border, the clear (x) button shown once there's a
 * value, and a distinct (confirmed, not inferred) error-footer color.
 *
 * Figma's default leading-icon slot is a generic placeholder image rather
 * than the search icon — the magnifying glass only appears as a *trailing*
 * icon in the inspected frames. Real search UIs conventionally lead with
 * the magnifying glass, so this component defaults it to the leading
 * position instead; this is a deliberate deviation, not an oversight.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      label,
      detail,
      helperText,
      errorText,
      error = false,
      value,
      onChange,
      onClear,
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
    const hasValue = Boolean(value);

    return (
      <div className={['ds-search-field', className].filter(Boolean).join(' ')}>
        {(label || detail) && (
          <div className="ds-search-field__header">
            {label && (
              <label htmlFor={inputId} className="ds-search-field__label">
                {label}
              </label>
            )}
            {detail && <span className="ds-search-field__detail">{detail}</span>}
          </div>
        )}
        <div
          className={[
            'ds-search-field__field',
            error && 'ds-search-field__field--error',
            disabled && 'ds-search-field__field--disabled',
            hasValue && 'ds-search-field__field--filled',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="ds-search-field__icon">
            <MagnifyingGlassIcon />
          </span>
          <input
            {...rest}
            ref={ref}
            id={inputId}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            disabled={disabled}
            aria-invalid={error || undefined}
            className="ds-search-field__input"
            type="search"
          />
          {hasValue && !disabled && (
            <button
              type="button"
              className="ds-search-field__clear"
              onClick={() => {
                onChange?.('');
                onClear?.();
              }}
              aria-label="Clear search"
            >
              <XCircleIcon />
            </button>
          )}
        </div>
        {footer && (
          <div
            className={['ds-search-field__footer', error && 'ds-search-field__footer--error']
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

SearchField.displayName = 'SearchField';
