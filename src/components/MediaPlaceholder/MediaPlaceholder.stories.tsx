import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlaceholder } from './MediaPlaceholder';

const meta: Meta<typeof MediaPlaceholder> = {
  title: 'Components/MediaPlaceholder',
  component: MediaPlaceholder,
  argTypes: {
    type: {
      control: 'select',
      options: ['image', 'illustration', 'icon', 'video-label', 'video-overlay'],
    },
    ratio: { control: 'select', options: ['1x1', '16x9', '4x3', '3x4'] },
  },
};

export default meta;
type Story = StoryObj<typeof MediaPlaceholder>;

export const Playground: Story = {
  args: { type: 'image', ratio: '16x9' },
  render: (args) => (
    <div style={{ width: 343 }}>
      <MediaPlaceholder {...args} />
    </div>
  ),
};

export const VideoOverlay: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <MediaPlaceholder type="video-overlay" ratio="16x9" duration="04:50" />
    </div>
  ),
};

export const VideoLabel: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <MediaPlaceholder type="video-label" ratio="16x9" duration="2:36" />
    </div>
  ),
};

export const AllTypesAndRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 140px)',
        gap: 16,
      }}
    >
      {(['image', 'illustration', 'icon', 'video-label', 'video-overlay'] as const).map((type) =>
        (['1x1', '16x9', '4x3', '3x4'] as const).map((ratio) => (
          <MediaPlaceholder key={`${type}-${ratio}`} type={type} ratio={ratio} duration="1:23" />
        )),
      )}
    </div>
  ),
};
