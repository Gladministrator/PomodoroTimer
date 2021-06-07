import React from "react"

function WorkoutTime ({state,dec,inc,setstate}){
    return (
        <div>
            <h1>Workout Set Duration:</h1>
            <button onClick={()=>dec(setstate)}>-</button>
                {state.minutes}:{state.seconds < 10? "0" + state.seconds :state.seconds}
            <button onClick={()=>inc(setstate)}>+</button>
            
        </div>
    )
}
export default WorkoutTime 