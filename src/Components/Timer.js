import React from "react";
import { useEffect } from "react";
import beep from "./Time is up.mp3";

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
  audi,
}) {
  useEffect(() => {
    if (state.starter === false) {
      setstarter(work.minutes * routines.counter * 60);
    }
    if (start + 1 === 0 && state.wording === "Session has begun") {
      setstarter(breaks.minutes * 60);
      setstate((prev) => ({
        ...prev,
        work: "No",
        counter: 1,
        wording: "Time for a break!",
        music: "Play",
      }));
      return audi;
    }
    if (start + 1 === 0 && state.wording === "Time for a break!") {
      setstarter(work.minutes * 60);
      setstate((prev) => ({
        ...prev,
        work: "Yes",
        counter: 1,
        wording: "Session has begun",
        music: "PlayAgain",
      }));
      return audi;
    }
    setstate((previous) => ({
      ...previous,
      minutes: Math.floor(start / 60),
      seconds: start % 60,
      counter: previous.counter + 1,
    }));
  }, [start, breaks, work, routines]);

  return (
    <div id="TimerArea">
      <h1>Total Time Remaining</h1>
      <p id="time-left">
        {state.minutes < 10 ? `0${state.minutes}` : state.minutes}:
        {state.seconds < 10 ? "0" + state.seconds : state.seconds}
      </p>
      <audio src={beep} id="beep"></audio>
      <p id="timer-label">{state.wording}</p>
      <div className="buttons">
        <button id="start_stop" onClick={starter}>
          {status.wording}
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default Timer;
