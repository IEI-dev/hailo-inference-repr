import React, { createContext, useState } from "react";
// import car2Json from "../../json/car2.json";
// import hailo_metaJson from "../../json/hailo_meta.json";
import detection12Json from "../../json/detection12.json";
import palaceJson from "../../json/hailo_meta.json";
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

export class FrameData_car {
  constructor(json, boxes = [], scores = [], lps = []) {
    for (let i = 0; i < json.frames.length; i++) {
      boxes.push(json.frames[i].boxes);
    }
    for (let i = 0; i < json.frames.length; i++) {
      lps.push(json.frames[i].lps);
    }
    for (let i = 0; i < json.frames.length; i++) {
      scores.push(json.frames[i].scores);
    }
    this.boxes = boxes;
    this.lps = lps;
    this.scores = scores;
    this.fps = json.fps;
    this.frame_count = json.frame_count;
    this.width = json.width;
    this.height = json.height;
  }
}

export class FrameData_hailo {
  constructor(json, subObjects = [], boxes = [], score = [], label = []) {
    for (let i = 0; i < json.length; i++) {
      subObjects.push(json[i].HailoROI.SubObjects);
      boxes.push([]);
      score.push([]);
      label.push([]);
      for (let j = 0; j < subObjects[i].length; j++) {
        boxes[i].push(subObjects[i][j].HailoDetection.HailoBBox);
        score[i].push(subObjects[i][j].HailoDetection.confidence);
        label[i].push(subObjects[i][j].HailoDetection.label);
      }
    }
    this.subObjects = subObjects;
    this.boxes = boxes;
    this.score = score;
    this.label = label;
    this.fps = 30.0; // 30.0; // 25
    this.frame_count = 960; // 329; // 960; // 744
    this.width = 640; // 1280; // 640;
    this.height = 640; // 720 // 640;
  }
}

// const hailoData = new FrameData_hailo(hailo_metaJson);
// console.log(hailoData);

const DataContextProvider = (props) => {
  // const basic = new FrameData_car(car2Json);
  // const basic = new FrameData_hailo(hailo_metaJson);
  const basic = new FrameData_hailo(detection12Json);
  // const basic = new FrameData_hailo(palaceJson);
  const [data, setData] = useState(basic);
  console.log(data);
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
