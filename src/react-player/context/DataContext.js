import React, { createContext, useState } from "react";
import palace_pJson from "../../json/palace_p.json";
export const DataContext = createContext();

export class FrameData_hailo2 {
  constructor(json, boxes = [], score = [], label = []) {
    for (let i = 0; i < json.frames.length; i++) {
      boxes.push(json.frames[i].boxes);
    }
    for (let i = 0; i < json.frames.length; i++) {
      label.push(json.frames[i].labels);
    }
    for (let i = 0; i < json.frames.length; i++) {
      score.push(json.frames[i].scores);
    }
    this.boxes = boxes;
    this.score = score;
    this.label = label;
    this.fps = json.fps;
    this.frame_count = json.frames.length;
    this.width = json.width;
    this.height = json.height;
  }
}

const DataContextProvider = (props) => {
  const basic = new FrameData_hailo2(palace_pJson);

  const [data, setData] = useState(basic);

  const addData = (json) => {
    let newData;
    newData = new FrameData_hailo2(json);
    setData(newData);
    return newData;
  };
  return (
    <DataContext.Provider value={{ data, addData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
