import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders headline and description', () => {
    render(<Toast headline="Saved" description="Your changes were saved." />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('has role="status" for assistive tech', () => {
    render(<Toast headline="Saved" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies the requested style', () => {
    const { container } = render(<Toast headline="Error" style="danger" />);
    expect(container.querySelector('.ds-toast--danger')).toBeInTheDocument();
  });

  it('renders and fires the optional action', () => {
    const onClick = vi.fn();
    render(<Toast headline="Update available" action={{ label: 'Refresh', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('hides the icon when showIcon is false', () => {
    const { container } = render(<Toast headline="Saved" showIcon={false} />);
    expect(container.querySelector('.ds-toast__icon')).not.toBeInTheDocument();
  });
});
