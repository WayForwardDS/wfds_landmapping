// ChatInput.tsx
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="w-full px-4 py-2 pr-10 text-sm bg-white border border-gray-300 rounded-full resize-none dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-600"
      />
      <button
        onClick={handleSend}
        className="absolute -translate-y-1/2 right-2 top-1/2 text-cyan-600 hover:text-cyan-800"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};
