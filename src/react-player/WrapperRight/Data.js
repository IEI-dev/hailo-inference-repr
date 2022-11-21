import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import detection0Json from "../../json/detection0.json";
import detection1Json from "../../json/detection1.json";
import detection2Json from "../../json/detection2.json";
import detection3Json from "../../json/detection3.json";
import detection4Json from "../../json/detection4.json";
import detection5Json from "../../json/detection5.json";
import detection6Json from "../../json/detection6.json";
import detection7Json from "../../json/detection7.json";
import hipposJson from "../../json/hungry-hippos.json";
import palaceJson from "../../json/palace_hailo.json";

let options = [
  "palace",
  "detection0",
  "detection1",
  "detection2",
  "detection3",
  "detection4",
  "detection5",
  "detection6",
  "detection7",
  "hippos",
];

let url = [
  "./videos/palace.mp4",
  "./videos/detection0.mp4",
  "./videos/detection1.mp4",
  "./videos/detection2.mp4",
  "./videos/detection3.mp4",
  "./videos/detection4.mp4",
  "./videos/detection5.mp4",
  "./videos/detection6.mp4",
  "./videos/detection7.mp4",
  "./videos/hungry-hippos.mp4",
];

let newUrl;

export default function Data({ handleUrl, seekToStart }) {
  const { addData } = useContext(DataContext);
  const [select, setSelect] = useState("palace");

  function pass(e) {
    if (e.startsWith(options[0])) {
      newUrl = url[0];
      addData(palaceJson);
    }
    if (e.startsWith(options[1])) {
      newUrl = url[1];
      addData(detection0Json);
    }
    if (e.startsWith(options[2])) {
      newUrl = url[2];
      addData(detection1Json);
    }
    if (e.startsWith(options[3])) {
      newUrl = url[3];
      addData(detection2Json);
    }
    if (e.startsWith(options[4])) {
      newUrl = url[4];
      addData(detection3Json);
    }
    if (e.startsWith(options[5])) {
      newUrl = url[5];
      addData(detection4Json);
    }
    if (e.startsWith(options[6])) {
      newUrl = url[6];
      addData(detection5Json);
    }
    if (e.startsWith(options[7])) {
      newUrl = url[7];
      addData(detection6Json);
    }
    if (e.startsWith(options[8])) {
      newUrl = url[8];
      addData(detection7Json);
    }
    if (e.startsWith(options[9])) {
      newUrl = url[9];
      addData(hipposJson);
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
