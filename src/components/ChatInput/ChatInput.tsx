import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import './ChatInput.css';

export interface ChatInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  /** Called with the current value on every keystroke. */
  onChange?: (value: string) => void;
  /** Called when the send button is clicked (or Enter is pressed) with a non-empty value. */
  onSend?: (value: string) => void;
  /** Accessible label for the send button — required since it has no visible text. */
  sendLabel?: string;
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * ChatInput — from Figma node 7520:3350 ("Chat input", part of the "Chat
 * components" collection at 40002030:3125). Covers all 4 Figma states
 * (Default/Hover/Focus/Disabled) — Hover and Focus are implemented with
 * native `:hover`/`:focus-within` rather than props, matching how every
 * other interactive component in this library handles those states.
 *
 * The send button only renders once there's text to send (`typing=True` in
 * Figma) — this matches Figma exactly, where the button is absent in every
 * `Typing=False` variant across Default/Hover/Focus/Disabled.
 */
export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      onChange,
      onSend,
      sendLabel = 'Send message',
      disabled,
      value,
      defaultValue,
      className,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = (isControlled ? value : internalValue) as string;
    const typing = currentValue.trim().length > 0;
    const inputId = useId();

    const fireSend = () => {
      if (!typing || disabled) return;
      onSend?.(currentValue);
    };

    return (
      <div
        className={['ds-chat-input', disabled && 'ds-chat-input--disabled', className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="ds-chat-input__field">
          <div className="ds-chat-input__text-container">
            <input
              {...rest}
              ref={ref}
              id={inputId}
              type="text"
              disabled={disabled}
              value={isControlled ? value : internalValue}
              className="ds-chat-input__field-input"
              onChange={(e) => {
                if (!isControlled) setInternalValue(e.target.value);
                onChange?.(e.target.value);
              }}
              onKeyDown={(e) => {
                onKeyDown?.(e);
                if (e.key === 'Enter' && !e.defaultPrevented) fireSend();
              }}
            />
          </div>
          {typing && (
            <button
              type="button"
              className="ds-chat-input__send"
              disabled={disabled}
              aria-label={sendLabel}
              onClick={fireSend}
            >
              <ArrowUpIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

ChatInput.displayName = 'ChatInput';
