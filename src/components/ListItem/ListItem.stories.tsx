import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Flat: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 360 }}>
      <ListItem label="Wi-Fi" detail="Home network" onClick={() => {}} />
      <ListItem label="Bluetooth" detail="Off" onClick={() => {}} />
      <ListItem label="Notifications" selected onClick={() => {}} />
      <ListItem label="Airplane mode" disabled detail="Off" />
    </ul>
  ),
};

export const Boxed: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 360 }}>
      <ListItem label="Profile" detail="Manage" container onClick={() => {}} />
      <ListItem label="Two-factor auth" selected container onClick={() => {}} />
      <ListItem label="Delete account" container disabled detail="Locked" />
    </ul>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, maxWidth: 760 }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
        <ListItem label="Flat, default" detail="Detail" onClick={() => {}} />
        <ListItem label="Flat, selected" selected onClick={() => {}} />
        <ListItem label="Flat, disabled" detail="Detail" disabled />
      </ul>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
        <ListItem label="Boxed, default" detail="Detail" container onClick={() => {}} />
        <ListItem label="Boxed, selected" selected container onClick={() => {}} />
        <ListItem label="Boxed, disabled" detail="Detail" container disabled />
      </ul>
    </div>
  ),
};
