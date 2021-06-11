import React from "react";
import { useEffect } from "react";

function Timer({
  starter,
  start,
  state,
  setstate,
  reset,
  breaks,
  work,
  routines,
  setstarter,
  status,
}) {
  useEffect(() => {
    if (state.starter === false) {
      setstarter((breaks.minutes + work.minutes) * routines.counter * 60);
    }
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
  }, [start, breaks, work, routines]);

  return (
    <div>
      <h1>Total Time Remaining</h1>
      <button id="start_stop" onClick={starter}>
        {status.wording}
      </button>
      <button id="reset" onClick={reset}>
        RESET
      </button>
      <p id="time-left">
        {state.minutes}:
        {state.seconds < 10 ? "0" + state.seconds : state.seconds}
      </p>
      <p>{state.wording}</p>
    </div>
  );
}

export default Timer;
