import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  args: { name: 'story-radio', label: 'Label' },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio {...args} defaultChecked />
      <Radio {...args} name="story-radio-2" />
    </div>
  ),
};

export const Emphasis: Story = {
  render: (args) => <Radio {...args} type="emphasis" defaultChecked />,
};

export const ErrorState: Story = {
  render: (args) => <Radio {...args} type="error" />,
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio {...args} disabled />
      <Radio {...args} name="story-radio-3" disabled defaultChecked />
    </div>
  ),
};
