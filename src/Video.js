import React from 'react'
import ReactPlayer from "react-player";

export default function Video() {
    return(
    <>
      <h1>React-player</h1>
      <ReactPlayer
        width="100%"
        controls={true}
        playing={true}
        url="https://www.youtube.com/watch?v=U22IwJs4VFs"
      />
      <footer>Made by react-player</footer>
    </>
    )
    
}
