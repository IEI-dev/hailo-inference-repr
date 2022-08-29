import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar";
import CanvasPractices from "./canvas/index";
import Websocket from "./websocket/Websocket";
import BtsSocket from "./websocket/BtsSocket";
import Chat from "./websocket/Chat";
import "./css/style.css";
import DataContextProvider from "./react-player/context/DataContext";
import CanvasContextProvider from "./react-player/context/CanvasContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

// scale
document.addEventListener("keydown", function(event) {
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  // const play = document.querySelector("#play");
  const play = document.querySelector(".play-pause-btn");
  const mute = document.querySelector("#mute");
  // const fullscreen = document.querySelector(".fullscreen");
  const fullscreen = document.querySelector(".full-screen-btn");
  const volumeUp = document.querySelector(".volumeUp");
  const volumeDown = document.querySelector(".volumeDown");
  const rewind = document.querySelector(".rewind");
  const forward = document.querySelector(".forward");
  // eslint-disable-next-line
  switch (event.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
      play.click();
      break;
    case "=":
    case "+":
      plus.click();
      break;
    case "-":
      minus.click();
      break;
    case "f":
      fullscreen.click();
      break;
    case "m":
      mute.click();
      break;
  }
  // eslint-disable-next-line
  switch (event.key) {
    case "ArrowLeft":
      rewind.click();
      break;
    case "ArrowRight":
      forward.click();
      break;
    case "ArrowUp":
      volumeUp.click();
      break;
    case "ArrowDown":
      volumeDown.click();
      break;
  }
});

root.render(
  <BrowserRouter>
    {/* <Navbar /> */}
    <Routes>
      <Route
        path="/"
        element={
          <DataContextProvider>
            <CanvasContextProvider>
              <App />
            </CanvasContextProvider>
          </DataContextProvider>
        }
      />
      <Route path="/websocket" element={<Websocket />} />
      <Route path="/canvas" element={<CanvasPractices />} />
      <Route path="/websocket/btssocket" element={<BtsSocket />} />
      <Route path="/websocket/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
