import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatLoadingIndicator } from './ChatLoadingIndicator';

describe('ChatLoadingIndicator', () => {
  it('renders a status role with the default accessible label', () => {
    render(<ChatLoadingIndicator />);
    expect(screen.getByRole('status', { name: 'Loading response' })).toBeInTheDocument();
  });

  it('renders 3 dots', () => {
    const { container } = render(<ChatLoadingIndicator />);
    expect(container.querySelectorAll('.ds-chat-loading-indicator__dot')).toHaveLength(3);
  });

  it('accepts a custom label', () => {
    render(<ChatLoadingIndicator label="Thinking" />);
    expect(screen.getByRole('status', { name: 'Thinking' })).toBeInTheDocument();
  });
});
