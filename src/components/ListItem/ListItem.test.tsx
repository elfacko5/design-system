import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListItem } from './ListItem';

describe('ListItem', () => {
  it('renders the label, sublabel, and detail text', () => {
    render(
      <ul>
        <ListItem label="Wi-Fi" sublabel="Home" detail="Connected" />
      </ul>,
    );
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('renders as static content when no onClick is given', () => {
    render(
      <ul>
        <ListItem label="Wi-Fi" />
      </ul>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as an interactive button and fires onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <ListItem label="Profile" onClick={onClick} />
      </ul>,
    );
    const button = screen.getByRole('button', { name: /profile/i });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible when interactive', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <ListItem label="Profile" onClick={onClick} />
      </ul>,
    );
    await user.tab();
    expect(screen.getByRole('button', { name: /profile/i })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render as a button when disabled, even with onClick', () => {
    const onClick = vi.fn();
    render(
      <ul>
        <ListItem label="Profile" onClick={onClick} disabled />
      </ul>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies the container class when container is true', () => {
    const { container } = render(
      <ul>
        <ListItem label="Profile" container />
      </ul>,
    );
    expect(container.querySelector('.ds-list-item--container')).toBeInTheDocument();
  });

  it('shows a selection indicator instead of the chevron when selected', () => {
    const { container } = render(
      <ul>
        <ListItem label="Profile" selected />
      </ul>,
    );
    expect(container.querySelector('.ds-list-item__selection')).toBeInTheDocument();
    expect(container.querySelector('.ds-list-item__trailing')).not.toBeInTheDocument();
  });
});
