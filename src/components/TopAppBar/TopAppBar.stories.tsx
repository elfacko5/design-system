import type { Meta, StoryObj } from '@storybook/react';
import { TopAppBar } from './TopAppBar';

function SlidersIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const meta: Meta<typeof TopAppBar> = {
  title: 'Components/TopAppBar',
  component: TopAppBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const Collapsed: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <TopAppBar
        variant="collapsed"
        title="Title"
        backLabel="Label"
        actions={[
          { icon: <SlidersIcon />, 'aria-label': 'Filters', badgeCount: 5 },
          { icon: <PlusIcon />, 'aria-label': 'Add' },
        ]}
        showBottomBorder
      />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <TopAppBar
        variant="expanded"
        title="Title"
        actions={[
          { icon: <SlidersIcon />, 'aria-label': 'Filters', badgeCount: 5 },
          { icon: <PlusIcon />, 'aria-label': 'Add' },
        ]}
      />
    </div>
  ),
};

export const WithProgressBar: Story = {
  name: 'With progress bar (pre scroll)',
  render: () => (
    <div style={{ width: 375 }}>
      <TopAppBar
        variant="collapsed"
        title="Title"
        progress={22}
        actions={[
          { icon: <SlidersIcon />, 'aria-label': 'Filters', badgeCount: 5 },
          { icon: <PlusIcon />, 'aria-label': 'Add' },
        ]}
      />
    </div>
  ),
};

export const WithProgressBarScrolled: Story = {
  name: 'With progress bar (post scroll)',
  render: () => (
    <div style={{ width: 375 }}>
      <TopAppBar
        variant="collapsed"
        title="Title"
        backLabel="Label"
        progress={22}
        showBottomBorder
        actions={[
          { icon: <SlidersIcon />, 'aria-label': 'Filters', badgeCount: 5 },
          { icon: <PlusIcon />, 'aria-label': 'Add' },
        ]}
      />
    </div>
  ),
};
