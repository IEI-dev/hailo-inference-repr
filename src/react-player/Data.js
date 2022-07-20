import React, { useState } from "react";
import mot20_01Json from "../json/MOT20-01.json";
import tc1Json from "../json/tc1.json";
import pwalk1Json from "../json/pwalk1.json";
import jisooJson from "../json/jisoo_september.json";
import palaceJson from "../json/palace.json";
class FrameData {
  constructor(json, boxes = [], ids = [], scores = []) {
    for (let i = 0; i < json.frames.length; i++) {
      boxes.push(json.frames[i].boxes);
    }
    for (let i = 0; i < json.frames.length; i++) {
      ids.push(json.frames[i].ids);
    }
    for (let i = 0; i < json.frames.length; i++) {
      scores.push(json.frames[i].scores);
    }
    this.boxes = boxes;
    this.ids = ids;
    this.scores = scores;
    this.width = json.width;
    this.height = json.height;
  }
}
let dataArray = {};
dataArray.mot20_01 = new FrameData(mot20_01Json);
dataArray.tc1 = new FrameData(tc1Json);
dataArray.pwalk1 = new FrameData(pwalk1Json);
dataArray.jisoo = new FrameData(jisooJson);
dataArray.palace = new FrameData(palaceJson);

let passData;
let url = [
  "./videos/MOT20-01-raw.webm",
  "./videos/tc1.mp4",
  "./videos/pwalk1.mp4",
  "./videos/jisoo_september.mp4",
  "./videos/palace.mp4",
];
let options = ["MOT20-01", "tc1", "pwalk1", "jisoo", "palace"];
let newUrl;

export default function Data({
  handleBoxes,
  setBoxes,
  setIds,
  setScores,
  setSW,
  setSH,
  setFps,
  setLimit,
  handleTime,
  frame,
  fps,
}) {
  const [select, setSelect] = useState("MOT20-01");
  // pass in (boxes, scores, ids, width, height, fps, total frames)
  function pass(e) {
    passData = [];
    if (e.startsWith(options[0])) {
      passData.push(
        dataArray.mot20_01.boxes,
        dataArray.mot20_01.scores,
        dataArray.mot20_01.ids,
        // dataArray.mot20_01.width,
        // dataArray.mot20_01.height,
        960,
        540,
        25,
        429
      );
      newUrl = url[0];
    }
    if (e === options[1]) {
      passData.push(
        dataArray.tc1.boxes,
        dataArray.tc1.scores,
        dataArray.tc1.ids,
        dataArray.tc1.width,
        dataArray.tc1.height,
        29.97,
        481
      );
      newUrl = url[1];
    }
    if (e.startsWith(options[2])) {
      passData.push(
        dataArray.pwalk1.boxes,
        dataArray.pwalk1.scores,
        dataArray.pwalk1.ids,
        dataArray.pwalk1.width,
        dataArray.pwalk1.height,
        29.97,
        900
      );
      newUrl = url[2];
    }
    if (e.startsWith(options[3])) {
      passData.push(
        dataArray.jisoo.boxes,
        dataArray.jisoo.scores,
        dataArray.jisoo.ids,
        dataArray.jisoo.width,
        dataArray.jisoo.height,
        23.976,
        1752
      );
      newUrl = url[3];
    }
    if (e.startsWith(options[4])) {
      passData.push(
        dataArray.palace.boxes,
        dataArray.palace.scores,
        dataArray.palace.ids,
        dataArray.palace.width,
        dataArray.palace.height,
        30.0,
        330
      );
      newUrl = url[4];
    }
  }

  function Select() {
    return (
      <>
        <h1>{select}</h1>
        <select
          id="videoJson"
          onChange={function(e) {
            setSelect(e.target.value);
            pass(e.target.value);
            handleBoxes(newUrl);
            setBoxes(passData[0]);
            setScores(passData[1]);
            setIds(passData[2]);
            setSW(passData[3]);
            setSH(passData[4]);
            setFps(passData[5]);
            setLimit(passData[6]);
            handleTime();
            const canvas = document.querySelector("canvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
          }}
          value={select}
        >
          {options.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div>
          <span id="frame-info">{frame + 1}</span>frames{" "}
          <span id="fps-info">{fps}fps</span>
        </div>
        <pre id="metadata-info"></pre>
      </>
    );
  }
  return <Select />;
}
