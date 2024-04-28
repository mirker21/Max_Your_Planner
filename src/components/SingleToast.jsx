import { toast } from "react-toastify"
import { useEffect } from "react"

// According to 
export default function SingleToast({ delay, time, msg, toastProps, setCurrentAnimation }) {    
    // We only want the toast to happen once for each scheduled reminder
    // time, as well as be able to prevent memory leaks by not removing
    // the timeouts that have already passed their scheduled time.
    useEffect(() => {
        const showToast = setTimeout(() => {
            toast(<Msg time={time} msg={msg} />, toastProps)
            setCurrentAnimation('Greet')
        }, delay)

        // cleanup function, clears timeout and clears up notifications that pop up.
        return () => (clearTimeout(showToast))
    }, [])
}

function Msg({ time, msg }) {
    return  (
        <div className="toast-container-centered">
            <img src="./public/Maxwell.png" alt="" />
            <p>
                <b>{time}</b> - {msg}
            </p>
        </div>
    )
}