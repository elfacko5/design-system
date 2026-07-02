import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  args: { children: 'Category tag' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Categories: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag {...args} variant="category1" />
      <Tag {...args} variant="category2" />
      <Tag {...args} variant="category3" />
      <Tag {...args} variant="category4" />
      <Tag {...args} variant="category5" />
    </div>
  ),
};

export const Ghost: Story = {
  render: (args) => <Tag {...args} variant="category1" appearance="ghost" />,
};
