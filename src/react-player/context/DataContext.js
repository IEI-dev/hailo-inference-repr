import React, { createContext, useState } from "react";
// import pwalk1Json_new from "../../json/pwalk1_new.json";
// import retailcctvJson from "../../json/retailcctv.json";
import retailroberyJson from "../../json/retailrobery.json";
export const DataContext = createContext();

export class FrameData_old {
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

export class FrameData_new {
  constructor(
    json,
    boxes = [],
    ids = [],
    attrs = [],
    entrance = [],
    keys = [],
    action = []
  ) {
    for (let i = 0; i < json.frames.length; i++) {
      ids.push(json.frames[i].ids);
    }
    for (let i = 0; i < json.frames.length; i++) {
      boxes.push(json.frames[i].mot.boxes);
    }
    for (let i = 0; i < json.frames.length; i++) {
      attrs.push(json.frames[i].attr.people);
    }
    for (let i = 0; i < json.frames.length; i++) {
      entrance.push(json.frames[i].entrance);
    }
    for (let i = 0; i < json.frames.length; i++) {
      keys.push(json.frames[i].kpt.keypoint[0]);
    }
    for (let i = 0; i < json.frames.length; i++) {
      action.push(json.frames[i].action);
    }
    this.ids = ids;
    this.boxes = boxes;
    this.attrs = attrs;
    this.width = json.width;
    this.height = json.height;
    this.allLength = json.frames[json.frames.length - 1].entrance.all.length;
    this.idAll =
      json.frames[json.frames.length - 1].entrance.all[this.allLength - 1];
    this.fps = json.fps;
    this.entrance = entrance;
    this.keys = keys;
    this.action = action;
    this.length = json.frames.length;
    this.frame_count = json.frame_count;
    this.entrance_line = json.entrance_line;
    this.basicIndex = -1;
  }
}
const DataContextProvider = (props) => {
  // const basic = new FrameData_new(pwalk1Json_new);
  const basic = new FrameData_new(retailroberyJson);
  const [data, setData] = useState(basic);
  const addData = (json, classType = "new") => {
    let newData;
    if (classType === "old") {
      newData = new FrameData_old(json);
    } else {
      newData = new FrameData_new(json);
    }
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
