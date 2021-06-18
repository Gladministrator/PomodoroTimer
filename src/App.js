import React from "react";
import { useState } from "react";
import { useRef } from "react";
import WorkoutTime from "./Components/WorkoutTime";
import BreakTime from "./Components/BreakTime";
import Timer from "./Components/Timer";

function App() {
  const [numroutines, setnumroutines] = useState({
    minutes: 1,
    seconds: 0,
    counter: 1,
  });
  const [workouttime, setworkouttime] = useState({
    minutes: 25,
    seconds: 0,
    counter: 25,
  });
  const [breaktime, setbreaktime] = useState({
    minutes: 5,
    seconds: 0,
    counter: 5,
  });
  const [timestate, settimestate] = useState({
    starter: false,
    intervalid: false,
    worktime: "",
    breaks: "",
    counter: "",
    work: "not started",
    minutes: 25,
    seconds: 0,
    wording: "Press Start to start your Session",
  });
  var activity = useRef({ active: true, paws: 0 });
  const [actstate, setactstate] = useState({ wording: "START" });
  const [start, setstart] = useState(60 * 25);
  var audio = useRef(null);

  function audi() {
    audio.current = document.getElementById("beep");
    audio.current.play();
  }
  function incTime(param) {
    param((set) => ({
      ...set,
      minutes: set.minutes < 60 ? set.minutes + 1 : 60,
      counter: set.counter < 60 ? set.counter + 1 : 60,
    }));
  }

  function decTime(param) {
    param((set) => ({
      ...set,
      minutes: set.minutes > 1 ? set.minutes - 1 : 1,
      counter: set.counter > 1 ? set.counter - 1 : 1,
    }));
  }

  function resetSession() {
    if (audio.current !== null) {
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current.Time = 0;
    }
    activity.current.active = true;
    activity.current.paws = 0;
    setactstate({ wording: "START" });
    clearInterval(timestate.intervalid);
    setstart(workouttime.minutes * numroutines.counter * 60);
    console.log(start);
    setbreaktime({
      minutes: 5,
      seconds: 0,
      counter: 5,
    });
    setnumroutines({
      minutes: 1,
      seconds: 0,
      counter: 1,
    });
    setworkouttime({
      minutes: 25,
      seconds: 0,
      counter: 25,
    });
    settimestate({
      starter: false,
      intervalid: "",
      worktime: "",
      breaks: "",
      counter: "",
      work: "not started",
      minutes: 25,
      seconds: 0,
      wording: "Press Start to start your Session",
    });
  }

  function startSession() {
    console.log("funk");
    if (!timestate.starter) {
      console.log("funk2");
      setactstate({ wording: "PAUSE" });
      setstart(workouttime.minutes * numroutines.counter * 60);
      settimestate((previous) => ({
        ...previous,
        intervalid: setInterval(() => {
          if (activity.current.active) {
            setstart((prevvalue) => prevvalue - 1);
          }
        }, 1000),
        starter: !timestate.starter,
        worktime: workouttime.counter,
        breaks: breaktime.counter,
        minutes: workouttime.minutes * numroutines.counter,
        seconds: 0,
        work: "Yes",
        counter: 0,
        wording: "Session has begun",
      }));
    } else {
      if (activity.current.paws === 0) {
        activity.current.active = false;
        activity.current.paws = 1;
        if (!audio.current === null) {
          audio.current.pause();
        }
        console.log(timestate.intervalid);

        setactstate({ wording: "RESUME" });
        clearInterval(timestate.intervalid);
      } else {
        settimestate((previous) => ({
          ...previous,
          intervalid: setInterval(() => {
            if (activity.current.active) {
              setstart((prevvalue) => prevvalue - 1);
            }
          }, 1000),
        }));
        if (!audio.current === null) {
          audio.current.play();
        }
        activity.current.active = true;
        activity.current.paws = 0;
        console.log("resumed");
        setactstate({ wording: "PAUSE" });
      }
    }
  }

  return (
    <div>
      <h1 id="title">POMODORO TIMER </h1>
      <WorkoutTime
        dec={decTime}
        inc={incTime}
        state={workouttime}
        setstate={setworkouttime}
      />
      <BreakTime
        dec={decTime}
        inc={incTime}
        state={breaktime}
        setstate={setbreaktime}
      />
      <Timer
        status={actstate}
        breaks={breaktime}
        work={workouttime}
        routines={numroutines}
        starter={startSession}
        start={start}
        setstarter={setstart}
        state={timestate}
        reset={resetSession}
        setstate={settimestate}
        audi={audi}
      />
    </div>
  );
}

export default App;
