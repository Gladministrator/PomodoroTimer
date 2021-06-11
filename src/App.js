import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import WorkoutTime from "./Components/WorkoutTime";
import BreakTime from "./Components/BreakTime";
import Timer from "./Components/Timer";
import Routines from "./Components/Routines";
import DKC_FF from "./Audio/DKC_FF.mp3";
import DDD_Mario from "./Audio/DDD_Mario.mp3";

function App() {
  const [numroutines, setnumroutines] = useState({
    minutes: 1,
    seconds: 0,
    counter: 1,
  });
  const [workouttime, setworkouttime] = useState({
    minutes: 2,
    seconds: 0,
    counter: 2,
  });
  const [breaktime, setbreaktime] = useState({
    minutes: 3,
    seconds: 0,
    counter: 3,
  });
  const [timestate, settimestate] = useState({
    starter: false,
    intervalid: "",
    worktime: "",
    breaks: "",
    counter: "",
    work: "not started",
    minutes: "",
    seconds: "",
    wording: "Press Start to get started!",
  });
  var activity = useRef({ active: true, paws: 0 });
  const [actstate, setactstate] = useState({ wording: "START" });
  const [start, setstart] = useState(60 * 30);
  var audio = useRef(null);
  var firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      console.log("FIRST");
      firstRender.current = false;
    } else if (timestate.work === "Yes" && audio.current === null) {
      audio.current = new Audio(DKC_FF);
      audio.current.Time = 0;
      audio.current.play();
    } else if (timestate.work === "Yes") {
      audio.current.pause();
      audio.current = new Audio(DKC_FF);
      audio.current.Time = 0;
      audio.current.play();
    } else if (timestate.work === "No") {
      audio.current.pause();
      audio.current = new Audio(DDD_Mario);
      audio.current.Time = 0;
      audio.current.play();
    }
  }, [timestate.work]);

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
      audio.current.Time = 0;
    }
    clearInterval(timestate.intervalid);
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
    settimestate((previous) => ({
      ...previous,
      starter: false,
      work: "not started",
      wording: "Press Start to get started!",
      minutes: 30,
    }));
  }

  function startSession() {
    if (!timestate.starter) {
      setactstate({ wording: "PAUSE" });
      setstart(
        (breaktime.minutes + workouttime.minutes) * numroutines.counter * 60
      );
      settimestate((previous) => ({
        ...previous,
        intervalid: setInterval(() => {
          if (activity.current.active) {
            console.log(activity.active);
            setstart((prevvalue) => prevvalue - 1);
          }
        }, 1000),
        starter: !timestate.starter,
        worktime: workouttime.counter,
        breaks: breaktime.counter,
        minutes:
          (breaktime.minutes + workouttime.minutes) * numroutines.counter,
        seconds: 0,
        work: "Yes",
        counter: 0,
        wording: "Workout Time!",
      }));
    } else {
      if (activity.current.paws === 0) {
        activity.current.active = false;
        activity.current.paws = 1;
        audio.current.pause();
        setactstate({ wording: "RESUME" });
      } else {
        activity.current.active = true;
        activity.current.paws = 0;
        audio.current.play();
        setactstate({ wording: "PAUSE" });
      }
    }
  }

  return (
    <div>
      <Routines
        dec={decTime}
        inc={incTime}
        state={numroutines}
        setstate={setnumroutines}
      />
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
      />
    </div>
  );
}

export default App;
