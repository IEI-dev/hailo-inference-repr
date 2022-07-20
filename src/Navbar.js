import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="bar">
        {/* <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <img
              src="./canvas/painting.png"
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
        </div> */}
        <div className="list-group">
          <Link
            to="./websocket"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            WebSocket
          </Link>
          <Link
            to="./"
            className="list-group-item list-group-item-action active"
          >
            React-player
          </Link>
          <Link
            to="./canvas"
            className="list-group-item list-group-item-action"
          >
            Canvas
          </Link>
        </div>
      </div>
    </>
  );
}
