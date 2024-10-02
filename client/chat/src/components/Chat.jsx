import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

const Chat = () => {
  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white w-80 flex-shrink-0 border-r border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Conversations</h2>
          <div className="mt-1 relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-8 pr-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          {" "}
          {/* Adjusted height */}
          <div className="p-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/placeholder-avatar-1.jpg" // Use a placeholder or conversation avatar
                  alt="User Avatar"
                />
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div className="ml-2 flex-1 overflow-hidden">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-gray-500 truncate">
                  Last message preview
                </p>
              </div>
              <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="/placeholder-avatar-1.jpg"
              alt="Chat User"
            />
            <div className="ml-2">
              <h2 className="text-lg font-semibold">Chat User Name</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <Video className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-2 overflow-y-auto bg-gray-50">
          <div className="flex mb-2 items-start">
            <img
              className="h-8 w-8 rounded-full mr-2"
              src="/placeholder-avatar-1.jpg"
              alt="Chat User"
            />
            <div className="p-2 rounded-lg max-w-xs bg-white shadow">
              <p>Hello there!</p>
              <span className="text-xs text-gray-400">12:00 PM</span>
            </div>
          </div>
          {/* Add more message blocks here if needed */}
        </div>

        {/* Message Input */}
        <form className="flex items-center p-2 border-t border-gray-200 bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
          >
            <Smile className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
