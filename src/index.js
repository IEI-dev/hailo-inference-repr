import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
