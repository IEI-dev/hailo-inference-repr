import React from "react";

export default function Elapsed({ elapsed, playRatio, duration }) {
  return (
    <>
      <div>
        {elapsed}/{duration}
      </div>
      <div>{playRatio.toFixed(2)}%</div>
    </>
  );
}
