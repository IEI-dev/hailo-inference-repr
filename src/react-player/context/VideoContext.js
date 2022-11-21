import React, { createContext, useState } from "react";

export const VideoContext = createContext();

const VideoContextProvider = (props) => {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    url: `./videos/palace.mp4`,
    // url: `./videos/hungry-hippos.mp4`,
    // url: `./videos/detection12.mp4`,
    // url: `./videos/detection0.mp4`,
    // url: `./videos/detection1.mp4`,
    // url: `./videos/detection2.mp4`,
    // url: `./videos/detection3.mp4`,
    // url: `./videos/detection4.mp4`,
    // url: `./videos/detection5.mp4`,
    // url: `./videos/detection6.mp4`,
    key: 0,
  });
  return (
    <VideoContext.Provider value={{ state, setState }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
