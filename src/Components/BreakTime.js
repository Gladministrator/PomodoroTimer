import React from "react"

const BreakTime = ({state,dec,inc,setstate}) =>{
    return (
        <div>
            <div id="break-label">
            <h1 className="Left-side-grid">Break Length</h1>
            <button onClick={() => dec(setstate)}>-</button>
            <div>{state.counter}:{state.seconds < 10? "0" + state.seconds :state.seconds}</div>
            <button onClick={() => inc(setstate)}>+</button>
            </div>
        </div>
    )
}

export default BreakTime