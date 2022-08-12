import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar";
import CanvasPractices from "./canvas/index";
import Websocket from "./websocket/Websocket";
import BtsSocket from "./websocket/BtsSocket";
import Chat from "./websocket/Chat";
// import videojson from "./json/tc1.json";
import videojson from "./json/pwalk1_new.json";
// import videojson from "./json/palace.json";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

let boxes = [];
let ids = [];
// let scores = [];
let attrs = [];
for (let i = 0; i < videojson.frames.length; i++) {
  ids.push(videojson.frames[i].ids);
}
for (let i = 0; i < videojson.frames.length; i++) {
  boxes.push(videojson.frames[i].mot.boxes);
}
for (let i = 0; i < videojson.frames.length; i++) {
  attrs.push(videojson.frames[i].attr.people);
}

// for (let i = 0; i < videojson.frames.length; i++) {
//   scores.push(videojson.frames[i].scores); // add seconds for the bug
// }
let width = videojson.width;
let height = videojson.height;
let allLength =
  videojson.frames[videojson.frames.length - 1].entrance.all.length;
let idAll =
  videojson.frames[videojson.frames.length - 1].entrance.all[allLength - 1];
let fps = videojson.fps;

let entrance = [];
for (let i = 0; i < videojson.frames.length; i++) {
  entrance.push(videojson.frames[i].entrance);
}

let keys = [];
for (let i = 0; i < videojson.frames.length; i++) {
  keys.push(videojson.frames[i].kpt.keypoint[0]);
}

let action = [];
for (let i = 0; i < videojson.frames.length; i++) {
  action.push(videojson.frames[i].action);
}

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
          <App
            ids={ids}
            boxes={boxes}
            // scores={scores}
            attrs={attrs}
            basicWidth={width}
            basicHeight={height}
            basicFps={fps}
            idAll={idAll} // biggest id
            entrance={entrance}
            keys={keys}
            action={action}
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
