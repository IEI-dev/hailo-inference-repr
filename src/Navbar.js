import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <h1>Canvas experiment</h1>
      <ul>
        <li>
          <Link to="./websocket">WebSocket</Link>
        </li>
        <li>
          <Link to="./">React-Player</Link>
        </li>
        <li>
          <Link to="./canvas">Canvas</Link>
        </li>
      </ul>
    </div>
  );
}
