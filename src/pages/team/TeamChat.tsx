// // src/pages/team/TeamChat.tsx

// import { useState } from "react";
// import ChatSidebar  from "../team/ChatSidebar";
// import { ChatWindow } from "../team/ChatWindow";
// import { ChatMessage, ChatUser } from "../../types/chat";

// export default function TeamChat() {
//   const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

//   const users: ChatUser[] = [
//     { id: "1", name: "Ali Raza", status: "Online" },
//     { id: "2", name: "Fatima Khan", status: "Busy" },
//     { id: "3", name: "Ahmed Noor", status: "Offline" },
//   ];

//   const dummyMessages: Record<string, ChatMessage[]> = {
//     "1": [
//       {
//           id: "msg1",
//           sender: "Ali Raza",
//           senderId: "1",
//           content: "Hello! Ready for the site visit?",
//           timestamp: new Date().toISOString(),
//           text: undefined
//       },
//     ],
//     "2": [
//       {
//           id: "msg2",
//           sender: "Fatima Khan",
//           senderId: "2",
//           content: "Please upload the coordinates file.",
//           timestamp: new Date().toISOString(),
//           text: undefined
//       },
//     ],
//     "3": [
//       {
//           id: "msg3",
//           sender: "Ahmed Noor",
//           senderId: "3",
//           content: "I’m currently offline. Leave a message!",
//           timestamp: new Date().toISOString(),
//           text: undefined
//       },
//     ],
//   };

//   return (

//       <div className="flex h-full overflow-hidden">
//         <ChatSidebar
//           users={users}
//           selectedUserId={selectedUser?.id ?? ""}
//           onSelectUser={(user) => setSelectedUser(user)}
//         />
//         <ChatWindow
//           selectedUser={selectedUser}
//           messages={selectedUser ? dummyMessages[selectedUser.id] ?? [] : []}
//         />
//       </div>

//   );
// }


import { useState } from "react";
import ChatSidebar from "../team/ChatSidebar";
import { ChatWindow } from "../team/ChatWindow";
import { ChatMessage, ChatUser } from "../../types/chat";

export default function TeamChat() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  const users: ChatUser[] = [
    { id: "1", name: "James Kollie", status: "Online" },
    { id: "2", name: "Samuel Doe", status: "Busy" },
    { id: "3", name: "Esther Nagb", status: "Offline" },
  ];

  // Local state for chat messages per user
  const [messagesByUser, setMessagesByUser] = useState<Record<string, ChatMessage[]>>({
    "1": [
      {
        id: "msg1",
        sender: "James Kollie",
        senderId: "1",
        content: "Hello! Ready for the site visit?",
        timestamp: new Date().toISOString(),
        text: undefined,
      },
    ],
    "2": [
      {
        id: "msg2",
        sender: "Samuel Doe",
        senderId: "2",
        content: "Please upload the coordinates file.",
        timestamp: new Date().toISOString(),
        text: undefined,
      },
    ],
    "3": [
      {
        id: "msg3",
        sender: "Esther Nagb",
        senderId: "3",
        content: "I’m currently offline. Leave a message!",
        timestamp: new Date().toISOString(),
        text: undefined,
      },
    ],
  });

  const handleSendMessage = (text: string) => {
    if (!selectedUser) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "Me",
      senderId: "me",
      content: text,
      timestamp: new Date().toISOString(),
      text: undefined,
    };

    setMessagesByUser((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ChatSidebar
        users={users}
        selectedUserId={selectedUser?.id ?? ""}
        onSelectUser={(user) => setSelectedUser(user)}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={selectedUser ? messagesByUser[selectedUser.id] ?? [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
