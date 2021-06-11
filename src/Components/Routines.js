import React from "react";

function Routines({ state, dec, inc, setstate }) {
  return (
    <div className="css-grid">
      <h1 id="timer-label">Session Rounds</h1>
      <button id="routine-decrement" onClick={() => dec(setstate)}>
        -
      </button>
      <div id="routine-length">{state.counter}</div>
      <button id="routine-increment" onClick={() => inc(setstate)}>
        +
      </button>
    </div>
  );
}
export default Routines;
