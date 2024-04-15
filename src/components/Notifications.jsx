import { useEffect, useState } from "react";
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications({todaysTodosFiltered}) {
    
    function calculateToastDelay(time, creationDate) {
        // get today's planned date including the scheduled time
        const todaysPlannedTime = new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ') + ' ' + time + ':00'
        console.log(todaysPlannedTime)
        const todaysPlannedTimeAsNum = new Date(todaysPlannedTime).getTime();
        const creationTimeAsNum = new Date(creationDate).getTime();
        let difference = 0;

        console.log(todaysPlannedTime, todaysPlannedTimeAsNum, creationTimeAsNum)
        // if creation date is not today, then use the very earliest time 
        // that today can be aka 00:00:00 to calculate the delay
        console.log(new Date(todaysPlannedTime).getTime())
        console.log(creationTimeAsNum)
        if (new Date(todaysPlannedTime).getTime() > new Date(Date.now()).getTime()) {
            if (creationDate.split(' ').slice(0, 4).join(' ') === todaysPlannedTime.split(' ').slice(0, 4).join(' ')) {
                console.log('today')
                difference = todaysPlannedTimeAsNum - creationTimeAsNum;
            } else {
                console.log('creation later')
                let startOfToday = new Date(todaysPlannedTime).toString()
                startOfToday = startOfToday.split(' ').slice(0, 4).join(' ') + ' 00:00:00'
                startOfToday = new Date(startOfToday).getTime()
                difference = todaysPlannedTimeAsNum - startOfToday;
            } 
        }

        console.log('difference', difference)

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
            console.log('ok')
            todaysTodosFiltered.map(todo => {
                console.log(todo)
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

                console.log('times', times)

                let checklist = [...todo.checklist.map(item => item.todo)]
                let checklistStr = 
                checklist.length > 1 
                ? 
                checklist.join(', ') 
                : 
                checklist.join('');

                console.log('checklist', checklist)

                if (times.length > 0) {
                    times.map(time => {
                        console.log(time)
                        if (time === 'All-Day') {
                            toast(checklistStr, {
                                role: "alert",
                                toastId: todo.id,
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
                        } else {
                            let delay = calculateToastDelay(time, todo.creationDate)
                            console.log('delay', typeof delay)
                            if (delay > 0) {
                                toast(checklistStr, {
                                    role: "alert",
                                    toastId: todo.id + ' ' + delay,
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
            })
        }
    }

    useEffect(() => {
        createTodaysToasts(todaysTodosFiltered)

        return () => {
            // dismiss needs to be here 
            // in case if new todos are added.
            toast.dismiss()
        }
    }, [todaysTodosFiltered])

    return (
        <div></div>
    )
}