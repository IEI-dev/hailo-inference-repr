// People Attributes
import React, { useState, useEffect } from "react";

export default function People({
  ids,
  frame,
  linecheck,
  attrs,
  idAll,
  entrance,
}) {
  const [personId, setPersonId] = useState(0);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setIndex(ids[frame].indexOf(parseInt(personId)));
  }, [frame, personId]);

  // choose id based on all's length
  function Options() {
    let row = [];
    for (let i = 0; i < idAll; i++) {
      row.push(<option key={i}>{i + 1}</option>);
    }
    return row;
  }

  function Attributes() {
    let row = {};
    let output = [];
    if (ids[frame][index] === undefined) {
      return;
    }
    // if value is true, return every key's value in paragraph, can switch key to svg you want
    for (let i = 0; i < 10; i++) {
      if (Object.values(attrs[frame][index])[i]) {
        let key = Object.keys(attrs[frame][index])[i];
        let value = Object.values(attrs[frame][index])[i];
        row[key] = value;

        switch (key) {
          case "gender":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "age":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "side":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "glasses":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "hat":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "holdobjectsinfront":
            output.push(<p key={i}>objects &nbsp;:&nbsp;{value.toString()}</p>);
            break;
          case "bag":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "upper":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "lower":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          case "boots":
            output.push(
              <p key={i}>
                {key}&nbsp;:&nbsp;{value.toString()}
              </p>
            );
            break;
          default:
            return;
        }
      }
    }
    return output;
  }

  return (
    <div>
      <p>
        in: {entrance[frame].in.length} / out: {entrance[frame].out.length}
      </p>
      <p>
        num: {ids[frame].length} / all count: {entrance[frame].all.length}
      </p>
      <h3>People Attribute</h3>
      <div>
        <label htmlFor="ids">Choose an id: </label>
        <select
          id="ids"
          onChange={(e) => {
            if (e.target.value === "All") {
              setIndex(-1);
            }
            setPersonId(e.target.value);
            // setIndex(ids[frame].indexOf(parseInt(e.target.value)));
          }}
          value={personId}
        >
          <option key={-1}>All</option>
          <Options />
          {/* {ids[frame].map((id, i) => {
            return <option key={i}>{id}</option>;
          })} */}
        </select>
      </div>
      <div>
        {index !== -1 ? (
          <>
            <p>{`id ${ids[frame][index]}`} : </p>
            <Attributes />
            {/* <p>{attrs[frame][index].gender}</p>
              <p>{attrs[frame][index].age}</p>
              <p>{attrs[frame][index].side}</p>
              <p>{attrs[frame][index].glasses}</p>
              <p>{attrs[frame][index].hat}</p>
              <p>{attrs[frame][index].holdobjectsinfront}</p>
              <p>{attrs[frame][index].bag}</p>
              <p>{attrs[frame][index].upper}</p>
              <p>{attrs[frame][index].lower}</p>
              <p>{attrs[frame][index].boots}</p> */}
          </>
        ) : (
          <>
            {personId && personId !== "All" ? (
              <p>id {personId} not found.</p>
            ) : (
              ""
            )}
            <p>Select an id listed below.</p>
          </>
        )}
        {index === -1 &&
          attrs[frame].map((people, i) => {
            return (
              <p key={i}>
                {`id${ids[frame][i]}`} : {people.gender}, {people.age}
              </p>
            );
          })}
      </div>
    </div>
  );
}
