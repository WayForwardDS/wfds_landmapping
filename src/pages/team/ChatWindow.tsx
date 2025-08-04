// src/components/team/ChatWindow.tsx
import { useEffect, useRef } from "react";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatUser, ChatMessage as ChatMessageType } from "../../types/chat";

type ChatWindowProps = {
  selectedUser: ChatUser | null;
  messages: ChatMessageType[];
  onSendMessage: (msg: string) => void;
};

export const ChatWindow = ({ selectedUser, messages, onSendMessage }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-300">
        Select a team member to start chatting
      </div>
    );
  }

  return (
   <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-white border-b dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
        <p className="text-sm text-gray-500">{selectedUser.status}</p>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
  <div className="flex flex-col gap-2 p-4">
    {messages.map((msg, idx) => (
      <ChatMessage key={idx} message={msg} />
    ))}
    <div ref={bottomRef} />
  </div>
</ScrollArea>

      {/* Chat Input */}
      <div className="p-2 bg-white border-t dark:border-slate-700 dark:bg-slate-800">
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
};
