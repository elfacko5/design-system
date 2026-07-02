import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders the primary action', () => {
    render(<ButtonGroup primaryAction={{ label: 'Continue' }} />);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('renders the secondary action only when provided', () => {
    const { rerender } = render(<ButtonGroup primaryAction={{ label: 'Continue' }} />);
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    rerender(
      <ButtonGroup primaryAction={{ label: 'Continue' }} secondaryAction={{ label: 'Cancel' }} />,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('fires the primary and secondary click handlers', async () => {
    const user = userEvent.setup();
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <ButtonGroup
        primaryAction={{ label: 'Continue', onClick: onPrimary }}
        secondaryAction={{ label: 'Cancel', onClick: onSecondary }}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('renders pagination dots when provided', () => {
    render(
      <ButtonGroup
        primaryAction={{ label: 'Continue' }}
        pagination={{ total: 4, activeIndex: 1 }}
      />,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('shows the home indicator by default and hides it when disabled', () => {
    const { container, rerender } = render(<ButtonGroup primaryAction={{ label: 'Continue' }} />);
    expect(container.querySelector('.ds-button-group__home-indicator')).toBeInTheDocument();
    rerender(<ButtonGroup primaryAction={{ label: 'Continue' }} showHomeIndicator={false} />);
    expect(container.querySelector('.ds-button-group__home-indicator')).not.toBeInTheDocument();
  });
});
