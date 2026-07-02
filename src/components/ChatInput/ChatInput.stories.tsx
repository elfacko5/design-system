import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <ChatInput placeholder="Ask a question" />
    </div>
  ),
};

export const Typing: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <ChatInput placeholder="Ask a question" defaultValue="What's the weather like?" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <ChatInput placeholder="Ask a question" disabled />
    </div>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    return (
      <div style={{ width: 343, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ul>
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <ChatInput
          placeholder="Ask a question"
          value={value}
          onChange={setValue}
          onSend={(v) => {
            setMessages((prev) => [...prev, v]);
            setValue('');
          }}
        />
      </div>
    );
  },
};
