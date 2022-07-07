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
import videojson from "./tc1.json";

const root = ReactDOM.createRoot(document.getElementById("root"));

let boxes = [];
let boxTime = [];
let ids = [];
for (let i = 0; i < videojson.frames.length; i++) {
  boxes.push(videojson.frames[i].boxes);
}
for (let i = 0; i < videojson.frames.length; i++) {
  boxTime.push(videojson.frames[i].time_offt + 0.7); // add seconds for the bug
}
for (let i = 0; i < videojson.frames.length; i++) {
  ids.push(videojson.frames[i].ids);
}

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={<App boxes={boxes} boxTime={boxTime} ids={ids} />}
      />
      <Route path="/websocket" element={<Websocket />} />
      <Route path="/canvas" element={<CanvasPractices />} />
      <Route path="/websocket/btssocket" element={<BtsSocket />} />
      <Route path="/websocket/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
