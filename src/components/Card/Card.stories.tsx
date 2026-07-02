import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        label="Label"
        headline="Card headline"
        description="Supporting description text that explains what this card is about."
        primaryAction={{ label: 'Primary' }}
        secondaryAction={{ label: 'Secondary' }}
      />
    </div>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        media={<div style={{ background: '#e5e7eb', width: '100%', height: '100%' }} />}
        label="Label"
        headline="Card with media"
        description="Supporting description text that explains what this card is about."
        primaryAction={{ label: 'Primary' }}
      />
    </div>
  ),
};
