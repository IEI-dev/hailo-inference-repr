import React, { useState } from "react";

export default function ToggleControls({ playerContainerRef }) {
  const [control, setControl] = useState(true);
  function toggleControls() {
    // const playerWrapper = document.querySelector(".player-wrapper");
    playerContainerRef.current.classList.toggle("control");
    setControl(!control);
  }
  return (
    <>
      {control ? (
        <button onClick={toggleControls} type="button" className="btn-control">
          <span className="material-symbols-rounded">
            keyboard_double_arrow_up
          </span>
        </button>
      ) : (
        <button onClick={toggleControls} type="button" className="btn-control">
          <span className="material-symbols-rounded">
            keyboard_double_arrow_down
          </span>
        </button>
      )}
    </>
  );
}
