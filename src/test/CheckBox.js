import React, { useState } from "react";

export default function CheckBox({ labelOn, labelOff }) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        className={isChecked ? "checked" : "notChecked"}
        checked={isChecked}
        onChange={onChange}
      />
      {isChecked ? labelOn : labelOff}
      {isChecked ? <h1>Hi, check!</h1> : <h1>Hi, no check!</h1>}
    </label>
  );
}
