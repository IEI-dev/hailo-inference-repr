import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="bar">
        <h2>Canvas Experiments</h2>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://cdn.icon-icons.com/icons2/488/PNG/512/lab_47723.png"
              alt="lab"
              width="30px"
              height="30px"
            />
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
      </div>
    </>
  );
}
