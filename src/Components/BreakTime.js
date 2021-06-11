import React from "react";

const BreakTime = ({ state, dec, inc, setstate }) => {
  return (
    <div>
      <div className="css-grid">
        <h1 id="break-label">Break Length</h1>
        <button id="break-decrement" onClick={() => dec(setstate)}>
          -
        </button>
        <div id="break-length">{state.counter} </div>
        <button id="break-increment" onClick={() => inc(setstate)}>
          +
        </button>
      </div>
    </div>
  );
};

export default BreakTime;
