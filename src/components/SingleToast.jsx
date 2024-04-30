import { toast } from "react-toastify"
import { useEffect } from "react"

// According to , we can simply put the toast into a set timeout. if the timeout is edited
export default function SingleToast({ 
        delay, 
        time, 
        msg, 
        toastProps, 
        setCurrentAnimation, 
        category,
        subcategory,
}) {    
    // We only want the toast to happen once for each scheduled reminder
    // time, as well as be able to prevent memory leaks by not removing
    // the timeouts that have already passed their scheduled time.

    useEffect(() => {
        const showToast = setTimeout(() => {
            toast(<Msg time={time} msg={msg} category={category} subcategory={subcategory} />, toastProps)
            setCurrentAnimation('Greet')
        }, delay)

        // cleanup function, clears timeout and clears up notifications that pop up.
        return () => (clearTimeout(showToast))
    }, [])
}

export function Msg({ time, msg, category, subcategory }) {
    return  (
        <div className="toast-info-container">
            <div className="toast-info-img-container">
                <img src="./Maxwell.png" alt="Max Your Planner" />
            </div>

            <ul className="toast-info-category-subcategory-time">
                <i>
                    <small>Category:</small> 
                    <br />
                    {category}
                </i>
                <i>
                    <small>Subcategory:</small> 
                    <br />
                    {subcategory}
                </i>
                <i>
                    <small>Time:</small> 
                    <br />
                    {time}
                </i>
            </ul>

            <ul className="toast-todo-list">
                {
                    msg.map((todo, index) => {
                        return (
                            <li key={todo + index}>- {todo}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}