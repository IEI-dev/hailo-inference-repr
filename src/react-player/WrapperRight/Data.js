import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import hipposJson from "../../json/hungry-hippos_p.json";
import palaceJson from "../../json/palace_p.json";

let options = ["palace", "hippos"];

let url = ["./videos/palace.mp4", "./videos/hungry-hippos.mp4"];

let newUrl;

export default function Data({ handleUrl, seekToStart, getSize }) {
  const { addData } = useContext(DataContext);
  const [select, setSelect] = useState("palace");

  function pass(e) {
    if (e.startsWith(options[0])) {
      newUrl = url[0];
      addData(palaceJson);
      const playerWrapper = document.querySelector(".player-wrapper");
      playerWrapper.style.setProperty("--element-width", "100%");
      playerWrapper.style.setProperty("--element-height", "56.25%");
      getSize();
    }
    if (e.startsWith(options[1])) {
      newUrl = url[1];
      addData(hipposJson);
      const playerWrapper = document.querySelector(".player-wrapper");
      playerWrapper.style.setProperty("--element-width", "56.25%");
      playerWrapper.style.setProperty("--element-height", "100%");
      getSize();
    }
  }

  return (
    <div className="data">
      <h5>{select}</h5>
      <label htmlFor="videoJson">Choose video:</label>
      <select
        id="videoJson"
        onChange={function(e) {
          setSelect(e.target.value);
          pass(e.target.value);
          handleUrl(newUrl);
          seekToStart();

          const canvas = document.querySelector("canvas");
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
          }
        }}
      >
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
