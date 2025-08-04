import { User } from "../../types/chat";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const users: User[] = [
  {
    id: "u1",
    name: "Esther Nagb",
    avatar: "/avatars/user1.png",
    online: true,
  },
  {
    id: "u2",
    name: "Samuel Doe",
    avatar: "/avatars/user2.png",
    online: false,
  },
  {
    id: "u3",
    name: "James Kollie",
    avatar: "/avatars/user3.png",
    online: true,
  },
];

type ChatSidebarProps = {
  selectedUserId: string;
  onSelectUser: (id: string) => void;
};

export default function ChatSidebar({ selectedUserId, onSelectUser }: ChatSidebarProps) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-full bg-white border-r border-gray-200 dark:bg-slate-900 dark:border-slate-700"
    >
      <div className="p-4 border-b dark:border-slate-700">
        <h2 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">Team & Chat</h2>
      </div>

      <ScrollArea className="h-full">
        <ul className="divide-y divide-gray-200 dark:divide-slate-700">
          {users.map((user) => (
            <li
              key={user.id}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-cyan-50 dark:hover:bg-slate-800",
                selectedUserId === user.id && "bg-cyan-100 dark:bg-slate-800"
              )}
              onClick={() => onSelectUser(user.id)}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 border border-gray-300 rounded-full dark:border-slate-600"
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                    user.online ? "bg-green-500" : "bg-gray-400"
                  )}
                ></span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </motion.aside>
  );
}
