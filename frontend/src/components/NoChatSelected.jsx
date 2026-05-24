import { MessageSquare, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const NoChatSelected = () => {
  const { onlineUsers } = useAuthStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to OuiChat</h2>
        <p className="text-base-content/60">
          Choose a contact to start a conversation.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-3 py-1 text-sm text-base-content/60">
          <Users className="size-4 text-primary" />
          <span>{Math.max(onlineUsers.length - 1, 0)} online now</span>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
