import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const SingleButton: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ButtonGroup primaryAction={{ label: "I'm a button" }} />
    </div>
  ),
};

export const TwoButtons: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ButtonGroup
        primaryAction={{ label: "I'm a button" }}
        secondaryAction={{ label: "I'm a button" }}
      />
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ButtonGroup
        primaryAction={{ label: "I'm a button" }}
        secondaryAction={{ label: "I'm a button" }}
        pagination={{ total: 6, activeIndex: 0 }}
      />
    </div>
  ),
};
