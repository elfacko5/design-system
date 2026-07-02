import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders headline and description', () => {
    render(<EmptyState headline="Nothing here" description="Try adding an item." />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Try adding an item.')).toBeInTheDocument();
  });

  it('defaults to the page variant', () => {
    const { container } = render(<EmptyState headline="Nothing here" />);
    expect(container.querySelector('.ds-empty-state--page')).toBeInTheDocument();
  });

  it('applies the card variant', () => {
    const { container } = render(<EmptyState headline="Nothing here" variant="card" />);
    expect(container.querySelector('.ds-empty-state--card')).toBeInTheDocument();
  });

  it('renders and fires the optional action', () => {
    const onClick = vi.fn();
    render(<EmptyState headline="Nothing here" action={{ label: 'Add item', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
