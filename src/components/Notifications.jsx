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

    const { notifications, remove, markAsRead } = useNotificationCenter()

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

    // createTodaysToasts is to figure out if some of 
    // todaysTodosFiltered has not happened yet, and if not, 
    // its delay can be calculated. Returns an array of  
    // objects containing info for each toast that 
    // needs to be created, including its calculated delay. 

    function createTodaysToasts(todaysTodosFiltered) {
        let toastArray = [];

        if (todaysTodosFiltered.length > 0) {
            todaysTodosFiltered.map(todo => {
                if (!deactivatedTodaysTodos.includes(todo.id)) {
                    let times = []; 
    
                    // Each time in times array will have its own toast.
                    // if the reminderFrequency is specified, then map 
                    // through it
                    
                    let toastDate = '';

                    if (todo.reminderFrequency[0].hasOwnProperty('date') === true) {
                        // Although we know that this todo
                        // is part of today's todos, if its 
                        // reminderFrequency is specified, we  
                        // still need to find the times that 
                        // have been set up for its date.

                        toastDate = new Date().toISOString().slice(0, 8) + new Date().getDate();
                        const todaysDay = new Date().toISOString().slice(0, 8) + new Date().getDate();
                        const todaysDateIndex = todo.reminderFrequency.findIndex(dateTime => {
                            console.log(dateTime.date, todaysDay, dateTime.date === todaysDay)
                            return dateTime.date === todaysDay;
                        });

                        console.log(todaysDay, todaysDateIndex, todo)

                        if (todo.reminderFrequency[todaysDateIndex].times === 'All-Day') {
                            times.push('All-Day')
                        } else {
                            todo.reminderFrequency[todaysDateIndex].times.map(time => {
                                times.push(time)
                            })
                        }

                    } else if (todo.reminderFrequency[0].hasOwnProperty('date') === false) {
                        if (todo.reminderFrequency[0].times === 'All-Day') {
                            times = ['All-Day'];
                        } else {
                            times = [...todo.reminderFrequency[0].times];
                        }
                    }
    
                    let checklist = [...todo.checklist.map(item => item.todo)]
    
                    if (times.length > 0) {

                        // If the user gives a specified time for a toast, 
                        // a number will be given for autoClose.
                        // Otherwise, autoClose will be set to false 
                        // if the time is set to All-Day.
                        
                        let index = 0;
                        times.map(time => {
                            if (time === 'All-Day') {
                                toastArray.push({
                                    content: checklist,
                                    role: "alert",
                                    toastId: todo.id + '' + index,
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
                                    date: toastDate,
                                });
                                index++;
                            } else {
                                let delay = calculateToastDelay(time)
                                if (delay > 0) {
                                    toastArray.push({
                                        content: checklist,
                                        role: "alert",
                                        toastId: todo.id + '' + index,
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
                                        date: toastDate,
                                    });
                                }
                                index++;
                            }
                        })
                    }
                }
            })
        }
        return toastArray;
    }
    
    // Typically, useMemo is used for optimization, 
    // but in this case it is needed for toasts to
    // work properly, because otherwise if outside
    // of a hook, the toast is dismissed immediately.
    // The value for toastArr is also needed immediately 
    // after createTodaysToasts, so useEffect will 
    // not be helpful.

    const toastArr = useMemo(() => {
        // We need the delay from createdToasts so 
        // we can update when the toast is rendered
        let createdToasts = createTodaysToasts(todaysTodosFiltered)
        // this if statement only deals with updating edited todos, 
        // and removing notifications whose todos have been deleted.
        console.log(notifications)
        if (createdToasts.length > 0) {
            notifications.map(notif => {
                if (createdToasts.findIndex(toast => notif.id === toast.toastId) !== -1) {
                    let updatedToastInfo = createdToasts[createdToasts.findIndex(toast => {
                        return notif.id === toast.toastId
                    })];
                    // compare notifcations and createdToasts
                    let newCategory = updatedToastInfo.category;
                    let newSubcategory = updatedToastInfo.subcategory; 
                    let newMsg = updatedToastInfo.content;
                    let newTime = updatedToastInfo.time;
                    let newDate = updatedToastInfo.date;
        
                    let newToastProps = {
                        role: updatedToastInfo.role,
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

                    if (updatedToastInfo.delay === 0) {
                        toast.update(notif.id, {
                            render: <SingleToast 
                                delay={updatedToastInfo.delay} 
                                date={newDate} 
                                time={newTime} 
                                msg={newMsg} 
                                category={newCategory} 
                                subcategory={newSubcategory} 
                                setCurrentAnimation={setCurrentAnimation} 
                                toastProps={newToastProps} 
                            />,
                            autoClose: updatedToastInfo.autoClose,
                            draggable: 'mouse'
                        })
                    } else {
                        // if the delay is greater than 0, 
                        // we need to dismiss the inaccurate current 
                        // toast being displayed and simply wait 
                        // for it to get rendered out as a 
                        // SingleToast below in the return statement.

                        // Before, the toast was getting rendered 
                        // twice when the updatedToastInfo.delay === 0
                        // if statement did not have the 
                        // toast.update inside of it and the
                        // update was dealt with outside of 
                        // any if statements. 

                        // The toast was displayed 
                        // once as a blank toast
                        // because of toast.update,
                        // and then twice at the 
                        // proper time when the
                        // toast was being mapped 
                        // over in toastArr and returned 
                        // as a SingleToast.
                        toast.dismiss(notif.id)
                    }

                    console.log('after', notifications)
                    // markAsRead set to false brings 
                    // back the notification that was updated
                    
                }
            })
        }
        // toast.dismiss()
        return createdToasts;
    }, [todaysTodosFiltered, deactivatedTodaysTodos])       
    
    notifications.map(notif => {
        let notificationIsStillInCreatedToasts = toastArr.some(createdToast => {
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

    return (
        <>
            {
                toastArr?.map(toast => {
                    let delay = toast.delay;
                    let time = toast.time;
                    let msg = toast.content;
                    let date = toast.date;

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
                            date={date}
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
        </>
    )
}