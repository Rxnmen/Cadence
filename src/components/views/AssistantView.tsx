import React from 'react';
import { ChatAssistant } from '../assistant/ChatAssistant';

export const AssistantView: React.FC = () => {
  return (
    <div className="space-y-4 pb-12">
      <ChatAssistant />
    </div>
  );
};
