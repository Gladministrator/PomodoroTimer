import React from "react"

function Routines({state,dec,inc,setstate}){

    return(
        <div>
            <h1>Number of Routines (Set + Break)</h1>           
            <button onClick={()=>dec(setstate)}>-</button>    
            {state.counter}
            <button onClick={()=>inc(setstate)}>+</button>        
            </div>
    )
}
export default Routines