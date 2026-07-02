import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>content</Container>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies the padding modifier class', () => {
    const { container } = render(<Container padding="lgPlus">content</Container>);
    expect(container.querySelector('.ds-container__content')).toHaveClass(
      'ds-container__content--padding-lgPlus',
    );
  });

  it('renders header and footer only when provided', () => {
    const { container, rerender } = render(<Container>content</Container>);
    expect(container.querySelector('.ds-container__header')).not.toBeInTheDocument();
    expect(container.querySelector('.ds-container__footer')).not.toBeInTheDocument();

    rerender(
      <Container header="Section title" footer="Footer">
        content
      </Container>,
    );
    expect(screen.getByText('Section title')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('omits the bordered background when bordered=false', () => {
    const { container } = render(<Container bordered={false}>content</Container>);
    expect(container.querySelector('.ds-container__content')).not.toHaveClass(
      'ds-container__content--bordered',
    );
  });
});
