import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  args: { headline: 'Headline text', description: 'Paragraph text' },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const AllStyles: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast {...args} style="informative" />
      <Toast {...args} style="danger" />
      <Toast {...args} style="success" />
      <Toast {...args} style="warning" />
    </div>
  ),
};

export const WithAction: Story = {
  render: (args) => <Toast {...args} style="warning" action={{ label: "I'm a button" }} />,
};
