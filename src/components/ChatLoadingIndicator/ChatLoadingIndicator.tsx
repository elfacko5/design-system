import type { HTMLAttributes } from 'react';
import './ChatLoadingIndicator.css';

export interface ChatLoadingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label announced to assistive tech while loading. */
  label?: string;
}

/**
 * ChatLoadingIndicator — from Figma node 7523:10537 ("ChatAnswerLoading",
 * part of the "Chat components" collection at 40002030:3125). Shown while
 * waiting for an assistant reply.
 *
 * Figma defines this as 3 static animation frames (Frame=1/2/3), each a set
 * of 3 flattened image-asset ellipses with a different dot "lit up" per
 * frame — the sandbox's network restrictions blocked fetching the Figma CDN
 * asset URLs, so the exact per-dot colors couldn't be sampled. Rebuilt here
 * as a standard CSS keyframe typing-indicator animation (a single neutral
 * dot color, opacity/scale pulsing in sequence) rather than reproducing 3
 * discrete static frames — this reads as the same "bouncing dots" motion
 * Figma's 3 frames imply, but the exact color/opacity curve is INFERRED,
 * not pixel-matched.
 */
export function ChatLoadingIndicator({
  label = 'Loading response',
  className,
  ...rest
}: ChatLoadingIndicatorProps) {
  return (
    <div
      {...rest}
      className={['ds-chat-loading-indicator', className].filter(Boolean).join(' ')}
      role="status"
      aria-label={label}
    >
      <span className="ds-chat-loading-indicator__dot" />
      <span className="ds-chat-loading-indicator__dot" />
      <span className="ds-chat-loading-indicator__dot" />
    </div>
  );
}
