import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabBarItem } from './TabBarItem';

describe('TabBarItem', () => {
  it('renders the label', () => {
    render(<TabBarItem label="Home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies the selected class and aria-pressed', () => {
    render(<TabBarItem label="Home" selected />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ds-tab-bar-item--selected');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<TabBarItem label="Home" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
