import React from "react"


function Timer({starter,start,state,setstate}){



     return (
<div>
    <h1>Total Time Remaining</h1>
    <button onClick={starter}>{!state.starter ? "Start" : "Stop"}</button>
    <p>{state.minutes}: {state.seconds < 10 ? "0" + state.seconds: state.seconds}</p>
        <p>{state.wording}</p>
</div>
    )
}

export default Timer