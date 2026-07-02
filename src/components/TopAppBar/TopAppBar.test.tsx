import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopAppBar } from './TopAppBar';

describe('TopAppBar', () => {
  it('renders the title inline for the collapsed variant', () => {
    render(<TopAppBar variant="collapsed" title="Settings" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders the title as a heading row for the expanded variant', () => {
    const { container } = render(<TopAppBar variant="expanded" title="Settings" />);
    expect(container.querySelector('.ds-top-app-bar__heading')).toHaveTextContent('Settings');
    expect(container.querySelector('.ds-top-app-bar__title')).not.toBeInTheDocument();
  });

  it('renders a back button only when backLabel is given', () => {
    const { rerender } = render(<TopAppBar title="Settings" />);
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
    const onBack = vi.fn();
    rerender(<TopAppBar title="Settings" backLabel="Back" onBack={onBack} />);
    fireEvent.click(screen.getByText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders trailing action icon buttons', () => {
    render(
      <TopAppBar
        title="Settings"
        actions={[
          { icon: <svg />, 'aria-label': 'Search' },
          { icon: <svg />, 'aria-label': 'Add' },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('shows a badge count on an action when provided', () => {
    render(
      <TopAppBar
        title="Settings"
        actions={[{ icon: <svg />, 'aria-label': 'Inbox', badgeCount: 3 }]}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('omits the progress bar when the progress prop is not given', () => {
    const { container } = render(<TopAppBar title="Settings" />);
    expect(container.querySelector('.ds-top-app-bar__progress-track')).not.toBeInTheDocument();
  });

  it('renders a progress bar with the given value', () => {
    const { container } = render(<TopAppBar title="Settings" progress={22} />);
    const track = screen.getByRole('progressbar');
    expect(track).toHaveAttribute('aria-valuenow', '22');
    const fill = container.querySelector('.ds-top-app-bar__progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('22%');
  });

  it('clamps progress to the 0–100 range', () => {
    const { rerender } = render(<TopAppBar title="Settings" progress={140} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<TopAppBar title="Settings" progress={-20} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});
