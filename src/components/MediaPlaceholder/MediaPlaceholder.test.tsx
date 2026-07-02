import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MediaPlaceholder } from './MediaPlaceholder';

describe('MediaPlaceholder', () => {
  it('applies the ratio and type modifier classes', () => {
    const { container } = render(<MediaPlaceholder type="video-overlay" ratio="4x3" />);
    const el = container.querySelector('.ds-media-placeholder');
    expect(el).toHaveClass('ds-media-placeholder--ratio-4x3');
    expect(el).toHaveClass('ds-media-placeholder--video-overlay');
  });

  it('renders a fallback icon for icon/illustration types', () => {
    const { container } = render(<MediaPlaceholder type="icon" ratio="1x1" />);
    expect(container.querySelector('.ds-media-placeholder__icon')).toBeInTheDocument();
  });

  it('renders the provided src as an image instead of the fallback icon', () => {
    render(<MediaPlaceholder type="illustration" ratio="1x1" src="/photo.jpg" alt="A photo" />);
    expect(screen.getByAltText('A photo')).toBeInTheDocument();
  });

  it('renders the duration label for video-overlay', () => {
    render(<MediaPlaceholder type="video-overlay" ratio="16x9" duration="04:50" />);
    expect(screen.getByText('04:50')).toBeInTheDocument();
  });

  it('renders the label badge with duration for video-label', () => {
    const { container } = render(
      <MediaPlaceholder type="video-label" ratio="16x9" duration="2:36" />,
    );
    expect(container.querySelector('.ds-media-placeholder__label-badge')).toBeInTheDocument();
    expect(screen.getByText('2:36')).toBeInTheDocument();
  });

  it('uses the large play icon size only for 1x1 video-overlay', () => {
    const { container: sq } = render(<MediaPlaceholder type="video-overlay" ratio="1x1" />);
    expect(sq.querySelector('.ds-media-placeholder__play--large')).toBeInTheDocument();

    const { container: wide } = render(<MediaPlaceholder type="video-overlay" ratio="16x9" />);
    expect(wide.querySelector('.ds-media-placeholder__play--default')).toBeInTheDocument();
  });
});
