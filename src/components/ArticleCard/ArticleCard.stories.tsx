import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const imageSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23e5e7eb"/></svg>',
  );

export const ImageTop: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <ArticleCard
        imagePosition="top"
        imageSrc={imageSrc}
        headline="Designing scalable token systems"
        meta="Jul 2, 2026 · 4 min read"
        description="A look at how tiered design tokens keep large component libraries consistent."
        tags={['Design Systems', 'Tokens']}
      />
    </div>
  ),
};

export const ImageRight: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <ArticleCard
        imagePosition="right"
        imageSrc={imageSrc}
        headline="Shipping accessible components"
        meta="Jun 28, 2026 · 3 min read"
      />
    </div>
  ),
};

export const Read: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <ArticleCard
        imagePosition="top"
        imageSrc={imageSrc}
        headline="Already read this one"
        meta="Jun 20, 2026 · 5 min read"
        read
      />
    </div>
  ),
};
