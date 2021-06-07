import React from "react"
import { useState } from "react"
import WorkoutTime from "./Components/WorkoutTime"
import BreakTime from "./Components/BreakTime"
import Timer from "./Components/Timer"
import {useRef} from "react"
import Routines from "./Components/Routines"
import { useEffect } from "react/cjs/react.development"
import DKC_FF from "./Audio/DKC_FF.mp3"
import DDD_Mario from "./Audio/DDD_Mario.mp3"


function App() {
  const [numroutines,setnumroutines] = useState({"minutes":1,"seconds":0,"counter":1})
  const [workouttime,setworkouttime] = useState({"minutes":1,"seconds":0,"counter":1})
  const [breaktime,setbreaktime]= useState({"minutes":1,"seconds":0,"counter":1})
  const [timestate,settimestate] = useState({"starter":false,"intervalid":"","worktime":"","breaks":"","counter":0,"work":"not started", "minutes":"","seconds":"","wording":"Press Start to get started!"})
  const [start,setstart] = useState("")
  var audio = useRef(null)

  function incTime(param){
        param(set => ({...set,"minutes":set.minutes + 1, "counter": set.counter + 1}))

      }

  function decTime(param){
    param(set => ({...set,"minutes": set.minutes>1 ? set.minutes - 1:1, "counter": set.counter>1 ? set.counter - 1:1}))
  }

  function startSession(){
    if (!timestate.starter){
    setstart(((breaktime.minutes + workouttime.minutes) * numroutines.counter)  * 60,)
    settimestate (previous=>({...previous, 
      "intervalid":setInterval(() => {setstart((prevvalue)=> prevvalue - 1)}, 100),
      "starter":!timestate.starter,
      "worktime":workouttime.counter,
      "breaks":breaktime.counter,
      "minutes":((breaktime.minutes + workouttime.minutes) * numroutines.counter),
      "seconds":0,
      "work":"Yes",
      "counter":0,
      "wording":"Workout Time!"
    })) 
  }
    else {
      
          clearInterval(timestate.intervalid)
          audio.current.pause()
          setstart(((breaktime.minutes + workouttime.minutes) * numroutines.counter)  * 60)
          settimestate(previous=>({...previous,"starter":!timestate.starter,"work":"not started","wording":"Press Start to get started!"}))
    }
  }


  useEffect(()=>{
    if (timestate.work === "not started" ){console.log("should stop")}
    else if (timestate.work === "Yes" && audio.current === null) {
      audio.current = new Audio (DKC_FF)
      audio.current.Time = 0 
      audio.current.play()
      console.log(audio.current)
      }
    else if (timestate.work === "Yes"){
      audio.current.pause()
      audio.current = new Audio (DKC_FF)
      audio.current.Time = 0 
      audio.current.play()
    }
    else if (timestate.work === "No") {
    audio.current.pause()
    audio.current = new Audio(DDD_Mario)
    audio.current.Time = 0 
    audio.current.play()}
},[timestate.work])

  return (    
  <div> 
    <Routines dec={decTime} inc={incTime} state={numroutines} setstate={setnumroutines}/>
    <WorkoutTime dec={decTime} inc={incTime} state={workouttime} setstate={setworkouttime}/>
    <BreakTime dec={decTime} inc={incTime} state={breaktime} setstate={setbreaktime}/>
    <Timer starter={startSession} start={start} state={timestate} setstate={settimestate}/>
  </div>)

}

export default App;
