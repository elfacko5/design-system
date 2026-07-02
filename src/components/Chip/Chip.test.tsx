import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders label text', () => {
    render(<Chip type="filter">Option</Chip>);
    expect(screen.getByText('Option')).toBeInTheDocument();
  });

  it('input chip renders a remove button and fires onRemove', () => {
    const onRemove = vi.fn();
    render(
      <Chip type="input" onRemove={onRemove}>
        Tag
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('filter chip toggles aria-pressed via selected prop', () => {
    const { rerender } = render(
      <Chip type="filter" selected={false}>
        Filter
      </Chip>,
    );
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'false');
    rerender(
      <Chip type="filter" selected>
        Filter
      </Chip>,
    );
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('filter chip renders a leading icon when provided', () => {
    const { container } = render(
      <Chip type="filter" icon={<svg data-testid="filter-icon" />}>
        Filter
      </Chip>,
    );
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    expect(container.querySelector('.ds-chip--has-icon')).toBeInTheDocument();
    expect(container.querySelector('.ds-chip__icon--filter')).toBeInTheDocument();
  });

  it('action chip fires onClick', () => {
    const onClick = vi.fn();
    render(
      <Chip type="action" onClick={onClick}>
        Action
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Action' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables filter/action chips', () => {
    render(
      <Chip type="action" disabled>
        Action
      </Chip>,
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeDisabled();
  });
});
