import { useMemo } from "react";
import { toast, Slide } from 'react-toastify'
import SingleToast from "./SingleToast";
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications({
    todaysTodosFiltered, 
    deactivatedTodaysTodos,
    setCurrentAnimation
}) {

    function calculateToastDelay(time, creationDate) {
        // get today's planned date and time
        const todaysPlannedTime = new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ') + ' ' + time + ':00'
        const todaysPlannedTimeAsNum = new Date(todaysPlannedTime).getTime();
        const rightNow = new Date(Date.now()).getTime();
        let difference = 0;

        // if the planned time for today's todo has not happened yet, calculate the delay.
        // otherwise, keep the delay at 0 and do not create the toast.
        if (todaysPlannedTimeAsNum > rightNow) {
            difference = todaysPlannedTimeAsNum - rightNow;
        }

        if (difference <= 0) {
            return 0;
        } else {
            return difference;
        }
        // if difference is less than or equal to zero, return 0.
        // if 0, do not send the notification
    }

    function createTodaysToasts(todaysTodosFiltered) {
        if (todaysTodosFiltered.length > 0) {
            let toastArray = [];

            todaysTodosFiltered.map(todo => {
                if (!deactivatedTodaysTodos.includes(todo.id)) {
                    let times = []; 
    
                    if (todo.reminderFrequency[0].hasOwnProperty('date') === true) {
                        todo.reminderFrequency.map(dateTime => {
                            if (dateTime.times === 'All-Day') {
                                times.push('All-Day')
                            } else {
                                times.push(...dateTime.times)
                            }
                        })
                        times = [...todo.reminderFrequency.map(dateTime => {
                            return [...dateTime.times];
                        })].flat(Infinity)
                    } else if (todo.reminderFrequency[0].hasOwnProperty('date') === false) {
                        if (todo.reminderFrequency[0].times === 'All-Day') {
                            times = ['All-Day'];
                        } else {
                            times = [...todo.reminderFrequency[0].times];
                        }
                    }
    
                    let checklist = [...todo.checklist.map(item => item.todo)]
                    let checklistStr = 
                    checklist.length > 1 
                    ? 
                    checklist.join(', ') 
                    : 
                    checklist.join('');
    
                    if (times.length > 0) {
                        let allDayCount = 0;

                        // If the user gives a specified time for a toast, 
                        // a number will be given for autoClose.
                        // Otherwise, autoClose will be set to false 
                        // if the time is set to All-Day.
                        
                        times.map(time => {
                            if (time === 'All-Day') {
                                toastArray.push({
                                    content: checklistStr + ' ' + time,
                                    role: "alert",
                                    toastId: todo.id + ' ' + time + ' ' + allDayCount,
                                    position: "bottom-right",
                                    autoClose: false,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Slide,
                                });
                                allDayCount++;
                            } else {
                                let delay = calculateToastDelay(time, todo.creationDate)
                                if (delay > 0) {
                                    toastArray.push({
                                        content: checklistStr + ' ' + time,
                                        role: "alert",
                                        toastId: todo.id + ' ' + time,
                                        position: "bottom-right",
                                        autoClose: 10000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Slide,
                                        delay: delay
                                    });
                                }
                            }
                        })
                    }
                }
            })
            return toastArray;
        }
    }
    
    // Typically, useMemo is used for optimization, 
    // but in this case it is needed for toasts to
    // work properly, because otherwise if outside
    // of a hook, the toast is dismissed immediately.
    // The value for toastArr is also needed immediately 
    // after createTodaysToasts, so useEffect will 
    // not be helpful. Dismiss is needed just in case 
    // if a notification's activation status has changed.

    const toastArr = useMemo(() => {
        toast.dismiss()
        return createTodaysToasts(todaysTodosFiltered);
    }, [todaysTodosFiltered, deactivatedTodaysTodos])

    return (
        <div>
            {
                toastArr?.map(toast => {
                    let delay = 0;
                    let time = toast.content.split(' ')[1];
                    let msg = toast.content.split(' ')[0];

                    let toastProps = {
                        role: "alert",
                        toastId: toast.toastId,
                        position: "bottom-right",
                        autoClose: toast.autoClose,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                    }
                    
                    // If the delay calculated is greater than 0,
                    // include it. Otherwise, it will happen instantly.

                    if (toast.hasOwnProperty('delay')) {
                        delay = toast.delay;
                    }

                    return (
                        <SingleToast 
                            key={toast.toastId}
                            delay={delay}
                            time={time}
                            msg={msg}
                            toastProps={toastProps}
                            setCurrentAnimation={setCurrentAnimation}
                        />
                    )
                })
            }
        </div>
    )
}