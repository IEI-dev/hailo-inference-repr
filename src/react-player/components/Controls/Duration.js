import React from "react";

const format = (sec) => {
  // const ms = Math.floor(sec * 100) % 100;  // use this line to show ms
  // Math.floor(sec * 1000) % 1000
  const hour = Math.floor((sec * 1000) / 360000);
  const min = Math.floor((sec * 1000) / 60000);
  const seconds = Math.floor(Math.floor(sec * 1000 - min * 60000) / 1000);
  let time;
  if (hour === 0) {
    time =
      min.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  } else {
    time =
      hour.toString().padStart(2, "0") +
      min.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  }

  // ms.toString().padStart(2, "0"); // padStart(3, "0")
  return time;
};

export default function Duration({ time, duration }) {
  return (
    <div className="duration-container">
      <div className="current-time" data-testid="current-time">
        {format(time)}
      </div>
      /
      <div className="total-time" data-testid="total-time">
        {format(duration)}
      </div>
    </div>
  );
}
