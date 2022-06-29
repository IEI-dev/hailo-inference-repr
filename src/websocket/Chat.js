import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Chat() {
  const URL = "ws://127.0.0.1:8080";
  const [user, setUser] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  const submitMessage = (usr, msg) => {
    const message = { user: usr, message: msg };
    ws.send(JSON.stringify(message));
    setMessages([...messages, message]);
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };
    ws.onmessage = (e) => {
      if (e.data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(e.data, "UTF-8");
        reader.onload = (e) => {
          const message = JSON.parse(reader.result);
          setMessages([...messages, message]);
          console.log(messages);
        };
      }
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
    // eslint-disable-next-line
  }, [ws.onmessage, ws.onopen, ws.onclose, messages]);
  return (
    <div className="chat">
      <label htmlFor="user">
        Name :&nbsp;
        <input
          type="text"
          id="user"
          placeholder="Type your name ..."
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <hr />
      <ul>
        <li>Server : Remember to open me first!</li>
        {messages.map((message, index) => (
          <li key={index}>
            <b>{message.user}</b> : <em>{message.message}</em>
          </li>
        ))}
      </ul>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage(user, message);
          setMessage([]);
        }}
      >
        <input
          type="text"
          placeholder={"Type a message ..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
      <Link to="/websocket/chat" target="_blank">
        New Chat
      </Link>
    </div>
  );
}
