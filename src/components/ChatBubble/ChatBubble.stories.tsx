import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  argTypes: {
    sender: { control: 'select', options: ['user', 'assistant'] },
    tail: { control: 'select', options: ['top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const User: Story = {
  args: { sender: 'user', tail: 'bottom', children: 'Text input' },
};

export const Assistant: Story = {
  args: { sender: 'assistant', tail: 'bottom', children: "Here's what I found." },
};

export const Conversation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ChatBubble sender="user" tail="bottom">
          What&apos;s the weather like?
        </ChatBubble>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ChatBubble sender="assistant" tail="top">
          It&apos;s sunny and 72°F right now.
        </ChatBubble>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ChatBubble sender="assistant" tail="bottom">
          Want the weekend forecast too?
        </ChatBubble>
      </div>
    </div>
  ),
};
