import type { Meta, StoryObj } from '@storybook/react';
import { ChatLoadingIndicator } from './ChatLoadingIndicator';

const meta: Meta<typeof ChatLoadingIndicator> = {
  title: 'Components/ChatLoadingIndicator',
  component: ChatLoadingIndicator,
};

export default meta;
type Story = StoryObj<typeof ChatLoadingIndicator>;

export const Default: Story = {};
