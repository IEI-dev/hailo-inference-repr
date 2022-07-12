import React, { useState } from "react";
import tc1Json from "../json/tc1.json";
import pwalk1Json from "../json/pwalk1.json";
import jisooJson from "../json/jisoo_september.json";
let tc1Boxes = [];
let tc1BoxTime = [];
let tc1Ids = [];
let pwalk1Boxes = [];
let pwalk1BoxTime = [];
let pwalk1Ids = [];
let jisooBoxes = [];
let jisooBoxTime = [];
let jisooIds = [];
let offset = -1;
let tc1SourceWidth = tc1Json.width;
let tc1SourceHeight = tc1Json.height;
let pwalk1SourceWidth = pwalk1Json.width;
let pwalk1SourceHeight = pwalk1Json.height;
let jisooSourceWidth = jisooJson.width;
let jisooSourceHeight = jisooJson.height;

function getVideoData(videojson, boxes, boxTime, ids) {
  for (let i = 0; i < videojson.frames.length; i++) {
    boxes.push(videojson.frames[i].boxes);
  }
  for (let i = 0; i < videojson.frames.length; i++) {
    boxTime.push(videojson.frames[i].time_offt + offset); // add seconds for the bug
  }
  for (let i = 0; i < videojson.frames.length; i++) {
    ids.push(videojson.frames[i].ids);
  }
}

getVideoData(tc1Json, tc1Boxes, tc1BoxTime, tc1Ids);
getVideoData(pwalk1Json, pwalk1Boxes, pwalk1BoxTime, pwalk1Ids);
getVideoData(jisooJson, jisooBoxes, jisooBoxTime, jisooIds);
let passData;
let url = [
  "./videos/tc1.mp4",
  "./videos/pwalk1.mp4",
  "./videos/jisoo_september.mp4",
];
let options = ["tc1", "pwalk1", "jisoo"];
let newUrl;

export default function Data({
  handleBoxes,
  setBoxes,
  setBoxTime,
  setIds,
  setSW,
  setSH,
}) {
  const [select, setSelect] = useState("tc1");
  function pass(e) {
    passData = [];
    if (e === options[0]) {
      passData.push(
        tc1Boxes,
        tc1BoxTime,
        tc1Ids,
        tc1SourceWidth,
        tc1SourceHeight
      );
      newUrl = url[0];
    }
    if (e.startsWith(options[1])) {
      passData.push(
        pwalk1Boxes,
        pwalk1BoxTime,
        pwalk1Ids,
        pwalk1SourceWidth,
        pwalk1SourceHeight
      );
      newUrl = url[1];
    }
    if (e.startsWith(options[2])) {
      passData.push(
        jisooBoxes,
        jisooBoxTime,
        jisooIds,
        jisooSourceWidth,
        jisooSourceHeight
      );
      newUrl = url[2];
    }
  }

  function Select() {
    return (
      <>
        <h3>{select}</h3>
        <select
          id="videoJson"
          onChange={function(e) {
            setSelect(e.target.value);
            pass(e.target.value);
            handleBoxes(newUrl);
            setBoxes(passData[0]);
            setBoxTime(passData[1]);
            setIds(passData[2]);
            setSW(passData[3]);
            setSH(passData[4]);
          }}
          value={select}
        >
          {options.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </>
    );
  }
  return <Select />;
}
