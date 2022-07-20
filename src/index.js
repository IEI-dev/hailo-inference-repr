import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import CanvasPractices from "./canvas/index";
import Websocket from "./websocket/Websocket";
import BtsSocket from "./websocket/BtsSocket";
import Chat from "./websocket/Chat";
// import videojson from "./json/tc1.json";
import videojson from "./json/MOT20-01.json";
// import videojson from "./json/palace.json";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

let boxes = [];
let ids = [];
let scores = [];
for (let i = 0; i < videojson.frames.length; i++) {
  ids.push(videojson.frames[i].ids);
}
for (let i = 0; i < videojson.frames.length; i++) {
  boxes.push(videojson.frames[i].boxes);
}
for (let i = 0; i < videojson.frames.length; i++) {
  scores.push(videojson.frames[i].scores); // add seconds for the bug
}
let width = videojson.width;
let height = videojson.height;
// console.log(boxes[200]);

// scale
window.addEventListener("keypress", function(event) {});
document.addEventListener("keydown", function(event) {
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  const play = document.querySelector("#play");
  const fullscreen = document.querySelector(".fullscreen");
  const volumeUp = document.querySelector(".volumeUp");
  const volumeDown = document.querySelector(".volumeDown");
  const rewind = document.querySelector(".rewind");
  const forward = document.querySelector(".forward");
  // eslint-disable-next-line
  switch (event.key.toLowerCase()) {
    case " ":
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
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <App
            ids={ids}
            boxes={boxes}
            scores={scores}
            basicWidth={width}
            basicHeight={height}
          />
        }
      />
      <Route path="/websocket" element={<Websocket />} />
      <Route path="/canvas" element={<CanvasPractices />} />
      <Route path="/websocket/btssocket" element={<BtsSocket />} />
      <Route path="/websocket/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
