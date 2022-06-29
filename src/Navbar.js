import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <h4>experiments</h4>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link className="dropdown-item" to="./websocket">
              WebSocket
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="./">
              React-Player
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="./canvas">
              Canvas
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
