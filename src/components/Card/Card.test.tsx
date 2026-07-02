import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders headline and description', () => {
    render(<Card headline="Headline" description="Description" />);
    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders an optional label', () => {
    render(<Card label="Label" headline="Headline" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders media when provided', () => {
    render(<Card media={<img alt="preview" src="x.png" />} headline="Headline" />);
    expect(screen.getByAltText('preview')).toBeInTheDocument();
  });

  it('fires primary and secondary action clicks', () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <Card
        headline="Headline"
        primaryAction={{ label: 'Go', onClick: onPrimary }}
        secondaryAction={{ label: 'Cancel', onClick: onSecondary }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('omits the button row when no actions are given', () => {
    const { container } = render(<Card headline="Headline" />);
    expect(container.querySelector('.ds-card__buttons')).not.toBeInTheDocument();
  });
});
