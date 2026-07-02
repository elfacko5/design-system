import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const items = [
  { key: 'home', label: 'Home' },
  { key: 'search', label: 'Search' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'profile', label: 'Profile' },
];

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('home');
    return (
      <div style={{ width: 375 }}>
        <TabBar items={items} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithHomeIndicator: Story = {
  render: function Render() {
    const [value, setValue] = useState('home');
    return (
      <div style={{ width: 375 }}>
        <TabBar items={items} value={value} onChange={setValue} homeIndicator />
      </div>
    );
  },
};
