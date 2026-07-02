import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabBar } from './TabBar';

const items = [
  { key: 'home', label: 'Home' },
  { key: 'search', label: 'Search' },
  { key: 'profile', label: 'Profile' },
];

describe('TabBar', () => {
  it('renders one button per item', () => {
    render(<TabBar items={items} value="home" />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('marks the item matching `value` as selected', () => {
    render(<TabBar items={items} value="search" />);
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the clicked item key', () => {
    const onChange = vi.fn();
    render(<TabBar items={items} value="home" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
    expect(onChange).toHaveBeenCalledWith('profile');
  });

  it('does not render the home indicator by default', () => {
    const { container, rerender } = render(<TabBar items={items} value="home" />);
    expect(container.querySelector('.ds-tab-bar__home-indicator')).not.toBeInTheDocument();

    rerender(<TabBar items={items} value="home" homeIndicator />);
    expect(container.querySelector('.ds-tab-bar__home-indicator')).toBeInTheDocument();
  });
});
