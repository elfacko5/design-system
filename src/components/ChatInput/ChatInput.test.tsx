import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  it('renders a text input with the given placeholder', () => {
    render(<ChatInput placeholder="Ask a question" />);
    expect(screen.getByPlaceholderText('Ask a question')).toBeInTheDocument();
  });

  it('does not render a send button until there is text', () => {
    render(<ChatInput placeholder="Ask a question" sendLabel="Send" />);
    expect(screen.queryByRole('button', { name: 'Send' })).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Ask a question'), { target: { value: 'Hi' } });
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('calls onSend with the current value when the send button is clicked', () => {
    const onSend = vi.fn();
    render(<ChatInput placeholder="Ask a question" sendLabel="Send" onSend={onSend} />);
    fireEvent.change(screen.getByPlaceholderText('Ask a question'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('calls onSend when Enter is pressed with non-empty text', () => {
    const onSend = vi.fn();
    render(<ChatInput placeholder="Ask a question" onSend={onSend} />);
    const input = screen.getByPlaceholderText('Ask a question');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('disables the input when disabled', () => {
    render(<ChatInput placeholder="Ask a question" disabled />);
    expect(screen.getByPlaceholderText('Ask a question')).toBeDisabled();
  });
});
