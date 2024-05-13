import { toast } from "react-toastify"
import { useEffect } from "react"

// According to , we can simply put the toast into a set timeout. if the timeout is edited
export default function SingleToast({ 
        delay, 
        date,
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
            toast(<Msg date={date} time={time} msg={msg} category={category} subcategory={subcategory} />, {...toastProps})
            setCurrentAnimation('Greet')
        }, delay)

        // cleanup function, clears timeout and clears up notifications that pop up.
        return () => (clearTimeout(showToast))
    }, [delay, date, time, msg])
}

export function Msg({ date, time, msg, category, subcategory }) {
    let dateString = String(new Date(date).toUTCString()).replace(',', '').split(' ')
    let dayWord = dateString[0];
    let dayNum = dateString[1];
    let month = dateString[2];
    let year = dateString[3];

    let displayedDate = dayWord + ', ' + month + ' ' + dayNum + ', ' + year;

    let meridian = 'AM';
    let [hour, minute] = time.split(':');

    if (hour <= 11) {
        if (hour[0] === '0') {
            hour = hour.slice(1,);
        }
    } else {
        if (hour > 12) {
            hour = hour - 12;
        }
        meridian = 'PM';
    }

    let displayedTime = hour + ':' + minute + ' ' + meridian;

    if (time === 'All-Day') {
        displayedTime = 'All-Day'
    }

    return  (
        <div className="toast-info-container" aria-label="Notification">
            <h4 aria-label="New Notification">New Notification</h4>
            <div className="toast-info-img-container" aria-hidden="true">
                <img src="./Maxwell.png" alt="Max Your Planner" />
            </div>

            <div className="toast-info-category-subcategory-time" aria-description="Category, Sub Category, Date, and Time of Notification. Only specified reminder frequencies can have set dates.">
                <i aria-label={"Category set to " + category}>
                    <small>Category:</small> 
                    <br aria-hidden="true"/>
                    {category}
                </i>
                <i aria-label={"Sub Category set to " + subcategory}>
                    <small>Subcategory:</small> 
                    <br aria-hidden="true"/>
                    {subcategory}
                </i>
                {
                    date !== ''
                    ?
                    <i aria-label={"Date set to " + displayedDate}>
                        <small>Date:</small> 
                        <br aria-hidden="true"/>
                        {displayedDate}
                    </i>
                    :
                    <></>
                }
                <i aria-label={"Time set to " + displayedTime}>
                    <small>Time:</small> 
                    <br aria-hidden="true"/>
                    {displayedTime}
                </i>
            </div>

            <ul className="toast-todo-list" role="list" aria-label="Notification's To-Do List">
                {
                    msg.map((todo, index) => {
                        return (
                            <li aria-label={"Item Number " + (parseInt(index) + 1) + ", " + todo} key={todo + index}>- {todo}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}