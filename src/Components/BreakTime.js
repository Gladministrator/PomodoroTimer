import React from "react"

const BreakTime = ({state,dec,inc,setstate}) =>{
    return (
        <div>
            <div>
            <h1>Break Length</h1>
            <button onClick={() => dec(setstate)}>-</button>
            {state.counter}:{state.seconds < 10? "0" + state.seconds :state.seconds}
            <button onClick={() => inc(setstate)}>+</button>
            </div>
        </div>
    )
}

export default BreakTime