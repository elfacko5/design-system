import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('defaults to category1/filled', () => {
    const { container } = render(<Tag>Design</Tag>);
    expect(container.querySelector('.ds-tag--category1')).toBeInTheDocument();
    expect(container.querySelector('.ds-tag--filled')).toBeInTheDocument();
  });

  it('applies the requested variant and appearance', () => {
    const { container } = render(
      <Tag variant="category4" appearance="filled">
        Urgent
      </Tag>,
    );
    expect(container.querySelector('.ds-tag--category4')).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>Design</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
