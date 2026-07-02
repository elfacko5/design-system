import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with an accessible label', () => {
    render(<IconButton icon={<svg />} aria-label="Delete" />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('defaults to hierarchy="primary" and size="default"', () => {
    const { container } = render(<IconButton icon={<svg />} aria-label="Delete" />);
    expect(container.querySelector('.ds-icon-button--primary')).toBeInTheDocument();
    expect(container.querySelector('.ds-icon-button--default')).toBeInTheDocument();
  });

  it('applies the danger modifier class', () => {
    const { container } = render(<IconButton icon={<svg />} aria-label="Delete" danger />);
    expect(container.querySelector('.ds-icon-button--danger')).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<IconButton icon={<svg />} aria-label="Delete" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a badge count when provided', () => {
    render(<IconButton icon={<svg />} aria-label="Inbox" badgeCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables the button', () => {
    render(<IconButton icon={<svg />} aria-label="Delete" disabled />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });
});
