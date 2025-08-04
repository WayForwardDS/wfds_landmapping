import { formatTime } from "../../utils/formateDate";
import { ChatMessage as ChatMessageType } from "../../types/chat";
import clsx from "clsx";

type Props = {
  message: ChatMessageType;
};

export const ChatMessage = ({ message }: Props) => {
  const isMe = message.sender === "Me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
  <div
    className={clsx(
      "relative px-4 py-2 rounded-xl shadow max-w-[75%] text-sm",
      isMe
        ? "bg-cyan-600 text-white rounded-br-none"
        : "bg-gray-200 text-gray-900 dark:bg-slate-700 dark:text-white rounded-bl-none"
    )}
  >
    <div className="break-words whitespace-pre-wrap">{message.content}</div>
    <div className={clsx(
      "absolute text-[10px]",
      isMe ? "bottom-1 right-2 text-white/70" : "bottom-1 right-2 text-slate-500"
    )}>
      {formatTime(message.timestamp)}
    </div>
  </div>
</div>
  );
};
