import React, { createContext, useState, useEffect } from "react";

export const VideoContext = createContext();

const VideoContextProvider = (props) => {
  const [options, setOptions] = useState([]);
  const getData = () => {
    fetch("videos/filelist.json")
      .then((res) => {
        return res.json();
      })
      .then((myJson) => {
        setOptions(myJson);
        // return myJson;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    url: "",
    key: 0,
  });

  return (
    <VideoContext.Provider value={{ state, setState, options }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
