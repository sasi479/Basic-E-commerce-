import { useState } from "react"

export default function Counter(){
    let [Count, setCount] =  useState(0);
    function updateCount(action){
        if(action == "increment"){
            console.log(Count)
            // setCount(Count+1)
            // setCount(Count+1)
            setCount(cur=>cur+1)
            setCount(cur=>cur+1)
            console.log(Count)

        }
        else if(action == "decrement"){
            console.log("decrement")

            setCount((prev)=>prev-1)
        }
        else if(action == "reset")
        {
            console.log("reset")

            setCount(0)
        }
    }

    return (
        <>
        <button onClick={()=>updateCount("decrement")}>➖</button>
        {/* <button onClick={updateCount("decrement")}>➖</button> */}
        <span>{Count}</span> 
        <button onClick={()=>updateCount("increment")}>➕</button>
        <button onClick={()=>updateCount("reset")}>Reset</button>
        </>
    )

}