import type { Meta, StoryObj } from '@storybook/react';
import { SectionFooter } from './SectionFooter';

const meta: Meta<typeof SectionFooter> = {
  title: 'Components/SectionFooter',
  component: SectionFooter,
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SectionFooter>;

export const Default: Story = {
  args: { children: 'Footer' },
  render: (args) => (
    <div style={{ width: 343 }}>
      <SectionFooter {...args} />
    </div>
  ),
};

export const Danger: Story = {
  args: { variant: 'danger', showIcon: true, children: 'Something went wrong. Please try again.' },
  render: (args) => (
    <div style={{ width: 343 }}>
      <SectionFooter {...args} />
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div style={{ width: 343, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionFooter align="left">Left-aligned footer</SectionFooter>
      <SectionFooter align="center">Center-aligned footer</SectionFooter>
      <SectionFooter align="right">Right-aligned footer</SectionFooter>
    </div>
  ),
};
