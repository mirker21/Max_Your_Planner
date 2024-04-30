import { useMemo } from "react";
import { toast, Slide } from 'react-toastify'
import SingleToast, { Msg } from "./SingleToast";
import 'react-toastify/dist/ReactToastify.css';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"

export default function Notifications({
    todaysTodosFiltered, 
    deactivatedTodaysTodos,
    setCurrentAnimation
}) {

    const { notifications, remove } = useNotificationCenter()

    function calculateToastDelay(time) {
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
                console.log(todo.category)
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
    
                    if (times.length > 0) {
                        let allDayCount = 0;

                        // If the user gives a specified time for a toast, 
                        // a number will be given for autoClose.
                        // Otherwise, autoClose will be set to false 
                        // if the time is set to All-Day.
                        
                        times.map(time => {
                            console.log(time)
                            if (time === 'All-Day') {
                                toastArray.push({
                                    content: checklist,
                                    role: "alert",
                                    toastId: todo.id + ' ' + time + ' ' + allDayCount,
                                    position: "bottom-right",
                                    autoClose: false,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Slide,
                                    delay: 0,
                                    category: todo.category,
                                    subcategory: todo.subcategory,
                                    time: time,
                                });
                                allDayCount++;
                            } else {
                                let delay = calculateToastDelay(time)
                                if (delay > 0) {
                                    toastArray.push({
                                        content: checklist,
                                        role: "alert",
                                        toastId: todo.id + ' ' + time,
                                        position: "bottom-right",
                                        autoClose: 10000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Slide,
                                        delay: delay,
                                        category: todo.category,
                                        subcategory: todo.subcategory,
                                        time: time,
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
        // I need the delay from createdToasts so 
        // I can update when the toast is rendered
        let createdToasts = createTodaysToasts(todaysTodosFiltered)

        notifications.map(notif => {
            if (createdToasts.findIndex(toast => notif.content.props.time === toast.time) !== -1) {
                let updatedToastInfo = createdToasts[createdToasts.findIndex(toast => notif.content.props.time === toast.time)];
                // compare notifcations and createdToasts
                let newToastId = updatedToastInfo.toastId;
                let newCategory = updatedToastInfo.category;
                let newSubcategory = updatedToastInfo.subcategory; 
                let newMsg = updatedToastInfo.content;
                let newTime = updatedToastInfo.time;
    
                let newToastProps = {
                    role: updatedToastInfo.role,
                    id: updatedToastInfo.toastId,
                    position: updatedToastInfo.position,
                    autoClose: updatedToastInfo.autoClose,
                    hideProgressBar: updatedToastInfo.hideProgressBar,
                    closeOnClick: updatedToastInfo.closeOnClick,
                    pauseOnHover: updatedToastInfo.pauseOnHover,
                    draggable: updatedToastInfo.draggable,
                    progress: updatedToastInfo.progress,
                    theme: updatedToastInfo.theme,
                    transition: updatedToastInfo.transition,
                }
    
                toast.update(notif.id, {
                    toastId: newToastId,
                    render: <SingleToast delay={updatedToastInfo.delay} time={newTime} msg={newMsg} category={newCategory} subcategory={newSubcategory} setCurrentAnimation={setCurrentAnimation} toastProps={createdToasts[0]} />
                })
            }
        })

        // toast.dismiss()
        return createTodaysToasts(todaysTodosFiltered);
    }, [todaysTodosFiltered, deactivatedTodaysTodos])       
    
    notifications.map(notif => {
        let notificationIsStillInCreatedToasts = toastArr.some(createdToast => {
            console.log(createdToast.toastId === notif.id)
            return createdToast.toastId === notif.id
        })

        if (notificationIsStillInCreatedToasts === false) {
            toast.dismiss(notif.id)
            remove(notif.id)
        }

        if (deactivatedTodaysTodos.some(deactivatedId => (notif.id.split(' ')[0] === deactivatedId)) === true) {
            toast.dismiss(notif.id)
            remove(notif.id)
        }
    })

    console.log(notifications)

    // Single Notification
    // {
    //     content: checklistStr,
    //     role: "alert",
    //     toastId: todo.id + ' ' + time + ' ' + allDayCount,
    //     position: "bottom-right",
    //     autoClose: false,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Slide,
    //     category: todo.category,
    //     subcategory: todo.subcategory,
    //     time: time,
    // }
    
    console.log(toastArr)

    return (
        <div>
            {
                toastArr?.map(toast => {
                    let delay = toast.delay;
                    let time = toast.time;
                    let msg = toast.content;

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

                    return (
                        <SingleToast 
                            key={toast.toastId}
                            delay={delay}
                            time={time}
                            msg={msg}
                            toastProps={toastProps}
                            category={toast.category}
                            subcategory={toast.subcategory}
                            setCurrentAnimation={setCurrentAnimation}
                            deactivatedTodaysTodos={deactivatedTodaysTodos}
                        />
                    )
                })
            }
        </div>
    )
}