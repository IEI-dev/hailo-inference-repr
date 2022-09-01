import React, { createContext, useState } from "react";

export const VideoContext = createContext();

const VideoContextProvider = (props) => {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    // url: `./videos/MOT20-05-raw.webm`,
    // url: `./videos/tc1.mp4`,
    // url: `./videos/palace.mp4`,
    // url: `./videos/MOT20-01-raw.webm`,
    // url: `./videos/pwalk1.mp4`,
    // url: `./videos/retailcctv_orig.mp4`,
    url: `./videos/retailrobery_orig.mp4`,
    key: 0,
  });
  return (
    <VideoContext.Provider value={{ state, setState }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
