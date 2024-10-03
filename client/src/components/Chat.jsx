import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import avatar from "../images/profile.png";
import io from "socket.io-client";
import { useEffect, useState } from "react";

// Connect to the Socket.io server
const socket = io.connect("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && room) {
      const messageData = { message, room };
      socket.emit("send-message", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, time },
      ]);
    });

    // Cleanup the effect when the component unmounts
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  // Function to join a chat room
  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room); // Emit a join room event to the server
    }
  };

  return (
    <div className="flex bg-gray-900 h-[870px]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Chat Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={avatar}
              alt="Chat User"
            />
            <div className="ml-2">
              <h2 className="text-lg font-semibold text-white">Chat</h2>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>
          {/* Join Room Input and Button */}
          <div className="flex items-center bg-gray-700 rounded-lg">
            <input
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              placeholder="Enter room name..."
              className="p-2 bg-transparent text-white border-none focus:outline-none focus:ring-0 placeholder-gray-400"
            />
            <button
              onClick={joinRoom}
              type="button"
              className="ml-2 p-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50"
            >
              Join Room
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <Phone className="h-5 w-5 text-gray-300" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <Video className="h-5 w-5 text-gray-300" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <MoreVertical className="h-5 w-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Messages Display */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          {messages.map((msg, index) => (
            <div key={index} className="flex mb-4 items-start">
              <img
                className="h-8 w-8 rounded-full mr-3"
                src={avatar}
                alt="Chat User"
              />
              <div className="p-3 rounded-lg max-w-xs bg-gray-800 shadow-lg">
                <p className="text-white">{msg.text}</p>{" "}
                {/* Display message text */}
                <span className="text-xs text-gray-500">
                  {msg.time} {/* Display message time */}
                </span>
              </div>
            </div>
          ))}
          {/* You can add more messages here if needed */}
        </div>

        {/* Message Input */}
        <form className="flex items-center p-4 border-t border-gray-700 bg-gray-800 overflow-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || !room} // Disable if message is empty or no room
            type="submit"
            className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="ml-2 p-2 text-gray-400 hover:text-gray-300"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="ml-2 p-2 text-gray-400 hover:text-gray-300"
          >
            <Smile className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
