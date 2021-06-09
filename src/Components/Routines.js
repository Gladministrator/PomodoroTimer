import React from "react";

function Routines({ state, dec, inc, setstate }) {
  return (
    <div>
      <h1>Choose the number of rounds (Workouts + Breaks)</h1>
      <button onClick={() => dec(setstate)}>-</button>
      {state.counter}
      <button onClick={() => inc(setstate)}>+</button>
    </div>
  );
}
export default Routines;
