import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.id; // Ensure your token contains `id`
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    if (token) {
      socket.emit("join_chat", token);
    }
    socket.on("chat_history", (chatHistory) => {
      setMessages(chatHistory);
    });
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("chat_history");
    };
  }, [token]);

  const sendMessage = () => {
    if (!token) {
      alert("Please log in to chat.");
      return;
    }

    if (message.trim()) {
      socket.emit("send_message", { token, message });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
      }}
    >
      {isOpen ? (
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            <strong>Live Chat</strong>
            <button onClick={() => setIsOpen(false)}>Minimize</button>
          </div>
          <div
            style={{ height: "200px", overflowY: "auto", marginTop: "10px" }}
          >
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>
                  {msg.senderId === currentUserId ? "You:" : "Admin:"}
                </strong>{" "}
                {msg.message}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "80%" }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            background: "blue",
            color: "#fff",
          }}
        >
          Chat
        </button>
      )}
    </div>
  );
};

export default Chat;
