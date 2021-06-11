import React from "react";

function WorkoutTime({ state, dec, inc, setstate }) {
  return (
    <div className="css-grid">
      <h1 id="session-label">Session Length</h1>
      <button id="session-decrement" onClick={() => dec(setstate)}>
        -
      </button>
      <div id="session-length">{state.minutes} </div>
      <button id="session-increment" onClick={() => inc(setstate)}>
        +
      </button>
    </div>
  );
}
export default WorkoutTime;
