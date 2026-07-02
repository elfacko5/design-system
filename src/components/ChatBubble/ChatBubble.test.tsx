import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  it('renders its content', () => {
    render(<ChatBubble>Hello there</ChatBubble>);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });

  it('defaults to sender=user, tail=bottom', () => {
    const { container } = render(<ChatBubble>Hi</ChatBubble>);
    const bubble = container.querySelector('.ds-chat-bubble');
    expect(bubble).toHaveClass('ds-chat-bubble--user');
    expect(bubble).toHaveClass('ds-chat-bubble--tail-bottom');
  });

  it('applies the assistant sender and top tail classes', () => {
    const { container } = render(
      <ChatBubble sender="assistant" tail="top">
        Hi back
      </ChatBubble>,
    );
    const bubble = container.querySelector('.ds-chat-bubble');
    expect(bubble).toHaveClass('ds-chat-bubble--assistant');
    expect(bubble).toHaveClass('ds-chat-bubble--tail-top');
  });
});
