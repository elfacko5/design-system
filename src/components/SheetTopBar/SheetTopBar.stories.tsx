import type { Meta, StoryObj } from '@storybook/react';
import { SheetTopBar } from './SheetTopBar';

const meta: Meta<typeof SheetTopBar> = {
  title: 'Components/SheetTopBar',
  component: SheetTopBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof SheetTopBar>;

export const TitleCenter: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SheetTopBar title="Title" align="center" onClose={() => {}} />
    </div>
  ),
};

export const TitleLeft: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SheetTopBar title="Title" align="left" onClose={() => {}} />
    </div>
  ),
};

export const GrabberOnly: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <SheetTopBar />
    </div>
  ),
};
