// src/stores/chatstore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, ChatUser } from "../types/chat";

type ChatStore = {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  messages: Record<string, ChatMessage[]>;
  selectUser: (user: ChatUser) => void;
  sendMessage: (userId: string, message: ChatMessage) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      users: [
        { id: "1", name: "Ali Raza", status: "Online", avatarUrl: "" },
        { id: "2", name: "Fatima Khan", status: "Busy surveying", avatarUrl: "" },
        { id: "3", name: "Ahmed Noor", status: "Available", avatarUrl: "" },
      ],
      selectedUser: null,
      messages: {
        "1": [
          {
            from: "me",
            content: "Ali, did you complete the terrain survey?",
            timestamp: 1750848649.769,
          },
          {
            from: "1",
            content: "Yes, uploading the drone footage now.",
            timestamp: 1750848769.769,
          },
        ],
        "2": [
          {
            from: "me",
            content: "Fatima, please verify the southern boundary.",
            timestamp: 1750848349.769,
          },
          {
            from: "2",
            content: "On it! I'll report back in 5 mins.",
            timestamp: 1750848409.769,
          },
        ],
        "3": [
          {
            from: "3",
            content: "Checking satellite alignment for export sectors.",
            timestamp: 1750848889.769,
          },
          {
            from: "me",
            content: "Thanks. Notify once confirmed.",
            timestamp: 1750848949.769,
          },
        ],
      },
      selectUser: (user) => set({ selectedUser: user }),
      sendMessage: (userId, message) => {
        const msgs = get().messages[userId] || [];
        set({
          messages: {
            ...get().messages,
            [userId]: [...msgs, message],
          },
        });
      },
    }),
    {
      name: "chat-store",
    }
  )
);
