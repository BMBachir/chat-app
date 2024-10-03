import {
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
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState("");

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && room) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageData = { message, time, sentByMe: true };

      // Add the sent message immediately to the sentMessages state
      setMessages((prevMessages) => [...prevMessages, messageData]);

      // Send the message to the server
      socket.emit("send-message", { message, room });
      setMessage(""); // Clear the input field
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageData = { message: data.message, time, sentByMe: false };
      // Add received message to the receivedMessages state
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Cleanup the effect when the component unmounts
    return () => {
      socket.off("receive-message");
    };
  }, []);
  const [joinedSuccessfully, setJoinedSuccessfully] = useState(false);
  // Function to join a chat room
  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room); // Emit a join room event to the server
      setJoinedSuccessfully("Joind Successfully");
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 h-screen md:h-[870px] w-full relative">
      {/* Overlay for Blurring Background */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Popover for Join Room Input and Button */}
          <div className="flex flex-col items-center w-64 bg-gray-700 rounded-lg shadow-lg p-4 transform transition-transform duration-300 ease-in-out scale-100 opacity-100">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-sm text-red-200 px-5 hover:bg-red-500 bg-red-600 rounded-lg p-1"
            >
              Close
            </button>
            <input
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              placeholder="Enter room name..."
              className="p-2 bg-transparent text-white border-none focus:outline-none focus:ring-0 placeholder-gray-400 w-full"
            />
            <button
              onClick={joinRoom}
              type="button"
              className="mt-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 w-full"
            >
              Join
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
          <div className="flex items-center ">
            <img
              className="h-8 w-8 rounded-full"
              src={avatar}
              alt="Chat User"
            />
            <div className="ml-2">
              <h2 className=" text-md md:text-lg font-semibold text-white">
                Chat
              </h2>
              <p className="md:text-sm text-xs text-green-400">Online</p>
            </div>
          </div>

          {/* Toggle Button for Join Room */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:text-sm text-xs bg-gray-600 hover:bg-gray-500 rounded-lg p-2"
          >
            {isOpen ? "Hide Room" : "Join Room"}
          </button>

          <div className="flex items-center md:space-x-4">
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
          <div className="grid grid-cols-1 gap-4">
            <p className="text-center text-green-800 text-sm">
              {joinedSuccessfully && "Joined Successfully"}
            </p>
            {/* Display sent and received messages */}
            {messages.map((msg, index) =>
              msg.sentByMe ? (
                <div key={index} className="flex justify-end mb-4 items-start">
                  <div className="p-3 rounded-lg max-w-xs bg-blue-600 shadow-lg">
                    <p className="text-white">{msg.message}</p>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex mb-4 items-start">
                  <img
                    className="h-8 w-8 rounded-full mr-3"
                    src={avatar}
                    alt="Chat User"
                  />
                  <div className="p-3 rounded-lg max-w-xs bg-gray-800 shadow-lg">
                    <p className="text-white">{msg.message}</p>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Message Input */}
        <form className="flex items-center p-4 border-t border-gray-700 bg-gray-800">
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
        </form>
      </div>
    </div>
  );
};

export default Chat;
