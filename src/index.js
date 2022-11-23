import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/style.css";
import DataContextProvider from "./react-player/context/DataContext";
import CanvasContextProvider from "./react-player/context/CanvasContext";
import VideoContextProvider from "./react-player/context/VideoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <Navbar /> */}
    <Routes>
      <Route
        path="/"
        element={
          <VideoContextProvider>
            <DataContextProvider>
              <CanvasContextProvider>
                <App />
              </CanvasContextProvider>
            </DataContextProvider>
          </VideoContextProvider>
        }
      />
    </Routes>
  </BrowserRouter>
);
