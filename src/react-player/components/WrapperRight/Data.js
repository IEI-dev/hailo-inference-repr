// to give the correct data and url to video-player based on select bar's selection.
import React, { useState, useContext } from "react";
// import mot20_01Json from "../../../json/MOT20-01.json";
// import tc1Json from "../../../json/tc1.json";
// import pwalk1Json from "../../../json/pwalk1.json";
// import jisooJson from "../../../json/jisoo_september.json";
// import palaceJson from "../../../json/palace.json";
import { DataContext } from "../../context/DataContext";
import pwalkJson_new from "../../../json/pwalk1_new.json";
import retailcctvJson from "../../../json/retailcctv.json";
import retailroberyJson from "../../../json/retailrobery.json";
import streetgang1Json from "../../../json/streetgang1.json";

let options = ["retailrobery", "retailcctv", "pwalk1", "streetgang1"];

let url = [
  "./videos/retailrobery_orig.mp4",
  "./videos/retailcctv_orig.mp4",
  "./videos/pwalk1.mp4",
  "./videos/streetgang1.mp4",
];
let newUrl;

export default function Data({ handleUrl, handleTime }) {
  const { addData } = useContext(DataContext);
  const [select, setSelect] = useState("retailrobery");

  function pass(e) {
    if (e.startsWith(options[0])) {
      newUrl = url[0];
      addData(retailroberyJson);
    }
    if (e.startsWith(options[1])) {
      newUrl = url[1];
      addData(retailcctvJson);
    }
    if (e.startsWith(options[2])) {
      newUrl = url[2];
      addData(pwalkJson_new);
    }
    if (e.startsWith(options[3])) {
      newUrl = url[3];
      addData(streetgang1Json);
    }
  }
  function Select() {
    return (
      <div className="data">
        <h5>{select}</h5>
        <select
          id="videoJson"
          onChange={function(e) {
            setSelect(e.target.value);
            pass(e.target.value);
            handleUrl(newUrl);
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
      </div>
    );
  }
  return <Select />;
}
