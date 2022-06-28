import React from "react";

export default function Canvas() {
  return (
    <>
      <div className="wrapper">
        <h1>Canvas</h1>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="./canvas/shapes.html">
                Shapes
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/circles.html">
                Circles
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/curves.html">
                Curves
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/characters.html">
                Characters
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/path2D.html">
                path2D
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/style&colors.html">
                style&colors
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/line.html">
                line
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/state.html">
                state
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="./canvas/transform.html">
                transform
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
