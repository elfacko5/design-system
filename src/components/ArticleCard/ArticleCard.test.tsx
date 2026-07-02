import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  it('renders headline, meta, and description', () => {
    render(<ArticleCard headline="Headline" meta="meta line" description="desc" />);
    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('meta line')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<ArticleCard headline="Headline" tags={['One', 'Two']} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('renders as a static div when no onClick is given', () => {
    const { container } = render(<ArticleCard headline="Headline" />);
    expect(container.querySelector('button.ds-article-card')).not.toBeInTheDocument();
    expect(container.querySelector('div.ds-article-card')).toBeInTheDocument();
  });

  it('renders as a button and fires onClick when interactive', () => {
    const onClick = vi.fn();
    render(<ArticleCard headline="Headline" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows the read overlay only when read is true', () => {
    const { rerender, container } = render(
      <ArticleCard headline="Headline" imageSrc="x.png" imageAlt="preview" read={false} />,
    );
    expect(container.querySelector('.ds-article-card__read-overlay')).not.toBeInTheDocument();
    rerender(<ArticleCard headline="Headline" imageSrc="x.png" imageAlt="preview" read />);
    expect(container.querySelector('.ds-article-card__read-overlay')).toBeInTheDocument();
  });

  it('applies the right image position class', () => {
    const { container } = render(<ArticleCard headline="Headline" imagePosition="right" />);
    expect(container.querySelector('.ds-article-card--right')).toBeInTheDocument();
  });
});
