import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders the title', () => {
    render(
      <Accordion title="Title" expanded={false} onToggle={vi.fn()}>
        Content
      </Accordion>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('hides content when collapsed and shows it when expanded', () => {
    const { rerender } = render(
      <Accordion title="Title" expanded={false} onToggle={vi.fn()}>
        Body content
      </Accordion>,
    );
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    rerender(
      <Accordion title="Title" expanded onToggle={vi.fn()}>
        Body content
      </Accordion>,
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('sets aria-expanded to reflect state', () => {
    render(
      <Accordion title="Title" expanded onToggle={vi.fn()}>
        Content
      </Accordion>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onToggle with the flipped state when clicked', () => {
    const onToggle = vi.fn();
    render(
      <Accordion title="Title" expanded={false} onToggle={onToggle}>
        Content
      </Accordion>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders an optional subtitle', () => {
    render(
      <Accordion title="Title" subtitle="Extra info" expanded={false} onToggle={vi.fn()}>
        Content
      </Accordion>,
    );
    expect(screen.getByText('Extra info')).toBeInTheDocument();
  });
});
