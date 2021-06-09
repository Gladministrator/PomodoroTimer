import React from "react";
import { useEffect } from "react";

function Timer({ starter, start, state, setstate }) {
  useEffect(() => {
    if (start === 1) {
      return starter;
    }
    setstate((previous) => ({
      ...previous,
      minutes: Math.floor(start / 60),
      seconds: start % 60,
      counter: previous.counter + 1,
    }));
    if (state.work === "Yes" && state.counter === state.worktime * 60) {
      return setstate((prev) => ({
        ...prev,
        work: "No",
        counter: 1,
        wording: "Time for a break!",
      }));
    } else if (state.work === "No" && state.counter === state.breaks * 60) {
      return setstate((prev) => ({
        ...prev,
        work: "Yes",
        counter: 1,
        wording: "Workout Time!",
      }));
    }
  }, [start]);

  return (
    <div>
      <h1>Total Time Remaining</h1>
      <button onClick={starter}>{!state.starter ? "Start" : "Stop"}</button>
      <p>
        {state.minutes}:{" "}
        {state.seconds < 10 ? "0" + state.seconds : state.seconds}
      </p>
      <p>{state.wording}</p>
    </div>
  );
}

export default Timer;
