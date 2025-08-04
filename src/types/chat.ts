// src/types/chat.ts

import { ReactNode } from "react";

export interface ChatUser {
  id: string;
  name: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export interface ChatMessage {
  text: ReactNode;
  sender: string;
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  participants: ChatUser[];
  messages: ChatMessage[];
}
