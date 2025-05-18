import { act, useReducer, useState } from "react"


function handleCount(state,action){
//    if(action.type =="inc"){
//     return state+action.value;
//    }
//    else if(action.type =="dec"){
//     return state-1;
//    }
//    else if(action.type =="reset"){
//     return 0;
//    }

   switch(action.type){
    case "inc": return state+action.value; 
    case "dec": return state-action.value; 
    case "reset": return 0; 
    default: return state
   }
}

export default function Counter(){
    let[count, updateCount] = useReducer(handleCount, 0)
    return(
        <>
        <p>Count: {count}</p>
        {/* <button onClick= {()=> setCount(++count)}>➕</button><button onClick={()=> setCount(--count)}>➖</button> */}
        <button onClick= {()=> updateCount({type:'inc',value:10 })}>➕</button><button onClick={()=>updateCount({type:'dec', value: 10})}>➖</button>
        <button onClick={()=>updateCount({type:'reset'})}>Reset</button>
        </>
    )
}
 function CounterWithUseState(){
    let [count, setCount] = useState(0);
    function handleCounter(action){
        if(action == "add") setCount(++count)
        else if(action == "dec") setCount(--count)
        else if(action == "reset") setCount(0)
    }
    return(
        <>
        <p>Count: {count}</p>
        <button onClick= {()=> handleCounter('add')}>➕</button><button onClick={()=> handleCounter('dec')}>➖</button>
        <button onClick={()=> handleCounter('reset')}>Reset</button>
        </>
    )
}