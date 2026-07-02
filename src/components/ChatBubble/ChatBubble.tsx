import type { HTMLAttributes, ReactNode } from 'react';
import './ChatBubble.css';

export type ChatBubbleSender = 'user' | 'assistant';
export type ChatBubbleTail = 'top' | 'bottom';

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** Who sent the message — affects side, fill, and tail-corner mirroring. */
  sender?: ChatBubbleSender;
  /** Which corner gets the squared-off "tail" — Bottom for the last bubble in a run, Top for the first. */
  tail?: ChatBubbleTail;
  children: ReactNode;
}

/**
 * ChatBubble — from Figma node 7451:2419 ("Chat bubble", part of the "Chat
 * components" collection at 40002030:3125).
 *
 * Figma only defines a `Sender=User` variant (2 symbols: Tail=Top and
 * Tail=Bottom, both User). There is no documented Assistant/received style —
 * confirmed via get_design_context, which returned a single `sender?: "User"`
 * prop with no alternative. Since a working two-party chat needs a second
 * style, an `assistant` variant was ADDED: same shape and corner logic,
 * mirrored to sit on the left, with a plain white fill and the same neutral
 * border (#dfe2e7) used elsewhere in this library (Card, Chip) rather than
 * User's #f3f4f6/#d1d5db combination. This is a deliberate, disclosed
 * addition — not a Figma-confirmed value.
 */
export function ChatBubble({
  sender = 'user',
  tail = 'bottom',
  children,
  className,
  ...rest
}: ChatBubbleProps) {
  return (
    <div
      {...rest}
      className={[
        'ds-chat-bubble',
        `ds-chat-bubble--${sender}`,
        `ds-chat-bubble--tail-${tail}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
