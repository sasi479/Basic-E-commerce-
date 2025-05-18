import { useEffect, useRef, useState } from "react";

export default function CountDown() {

   let  [totaltime, settotaltime] = useState(5)
    let timer;
    function FormatTime() {
        let hour = Math.floor(totaltime / 3600);
        let min = Math.floor((totaltime % 3600) / 60);
        let sec = totaltime % 60;
        let res = `${hour}H:${min}M:${sec}S`;
        return res
    }


    // useEffect(function,[])
    useEffect(()=>{
      timer =  setInterval(UpdateTime, 1000);
    },[])
    function UpdateTime() {
        settotaltime(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                return 0
            }
            return prev-1
        }
        )
    }
    // timer = setInterval(UpdateTime, 1000)
    return (
        <>
            <div>{FormatTime()}</div>
        </>
    )
}