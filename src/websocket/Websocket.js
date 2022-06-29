import React from "react";
import { Link } from "react-router-dom";

export default function Websocket() {
  return (
    <div className="nav2">
      <h1>WebSocket</h1>
      <ul>
        <li>
          <Link to="./btssocket">BtsSocket</Link>
        </li>
        <li>
          <Link to="./chat">Chat</Link>
        </li>
      </ul>
    </div>
  );
}
