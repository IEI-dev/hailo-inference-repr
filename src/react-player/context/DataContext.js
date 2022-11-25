import React, { createContext, useState, useEffect } from "react";
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
  let basic = {
    boxes: [],
    score: [],
    label: [],
    fps: 30,
    frame_count: 900,
    width: 1280,
    height: 720,
  };
  let options;
  const getData = () => {
    fetch("videos/filelist.json")
      .then((res) => {
        return res.json();
      })
      .then((myJson) => {
        options = myJson;
        // return myJson;
        fetch(`videos/${options[0]}_p.json`)
          .then((res) => {
            return res.json();
          })
          .then((myJson) => {
            basic = new FrameData_hailo2(myJson);
            setData(basic);
          });
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
