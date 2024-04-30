import { useState, useMemo } from "react";
import ProjectCanvas from "./ProjectCanvas";
import Notifications from "./Notifications";

// This component was created to reduce the 
// clutter in Todo.jsx by moving all of these 
// smaller check functions and children that  
// need todaysTodosFiltered into this one.

export default function TodaysTodosFilteredParent({
        todos,
        setTodos,
        currentPanel,
        setCurrentPanel,
        currentAnimation,
        setCurrentAnimation
}) {

    const [deactivatedTodaysTodos, setDeactivatedTodaysTodos] = useState([]);

    // checkSpecifiedDate is to determine if the date specified is actually today
    function checkSpecifiedDate(todo) {
        const todaysDate = new Date(new Date(Date.now()).toLocaleDateString()).toISOString().split('T')[0];
        todo.reminderFrequency.map(dateTime => {
            const todoDate = new Date(new Date(dateTime.date).toUTCString()).toISOString().split('T')[0];
            return todoDate === todaysDate;
        })
    }

    // checkPatternDay is to determine if today's day falls in alignment with the day pattern given for the todo
    function checkPatternDay(dateTime, todaysDate, todo) {
        // DAY
        // Huge thanks to Shyam Habarakada https://stackoverflow.com/a/15289883/18628118 for providing a solution for calculating time difference.
        let isDayMatching = false;
        if (dateTime.day.dayEquation.first !== '' || dateTime.day.dayEquation.second !== '') {
            let firstNum = dateTime.day.dayEquation.first === '' ? 1 : dateTime.day.dayEquation.first;
            let secondNum = dateTime.day.dayEquation.second === '' ? 0 : dateTime.day.dayEquation.second;
            let creationDate = new Date(new Date(todo.creationDate).toUTCString()).toISOString().split('T')[0];
            const todaysDateAsNum = Date.UTC(new Date(todaysDate).getFullYear(), new Date(todaysDate).getMonth(), new Date(todaysDate).getDate());
            const creationDateAsNum = Date.UTC(new Date(creationDate).getFullYear(), new Date(creationDate).getMonth(), new Date(creationDate).getDate());
            const difference = todaysDateAsNum - creationDateAsNum;

            // isFollowingEquation is to figure out if 
            // today's date happens to land somewhere on the equation 
            // the user gave, based on when the creation date was.
            const isFollowingEquation = (difference - secondNum) % firstNum === 0;
            if (isFollowingEquation) {
                isDayMatching = true;
            }
        } else if (dateTime.day.isEveryDayOfWeekEachMonth === true) {
            if (dateTime.day.days.length === 0) {
                isDayMatching = true;
            } else {
                let todaysDayIndex = new Date(todaysDate).getUTCDay()
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let todaysDay = dayNames[todaysDayIndex];
                if (dateTime.day.days.includes(todaysDay) === true) {
                    isDayMatching = true;
                }
            }
        } else if (dateTime.day.everyNthDayOfWeekEachMonth.length > 0) {
            let todaysDayIndex = new Date(todaysDate).getUTCDay()
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let todaysDay = dayNames[todaysDayIndex];
            // so, we check which day of week is todays day.
            // after that, we check if the current position for todays day matches the number we have for every nth day of week
            // Huge thanks to jabclab for providing a great way to find all instances of a day of the week that exist in a specific month https://stackoverflow.com/a/9481478/18628118 for 
            function findAllInstancesOfDay(todaysDayIndex, todaysDate) {
                // be sure to start of with first day of month
                let d = new Date([...new Date(todaysDate).toISOString().split('T')[0]].slice(0, -2).join('') + '01');
                let currentMonth = d.getMonth();
                let dayInstances = [];

                // start at first instance of day
                while (d.getUTCDay() !== todaysDayIndex) {
                    d.setDate(d.getDate() + 1);
                }

                // after that, add 7 days each time you push the date 
                // for that instance of day, up until the end of the month
                while (d.getMonth() === currentMonth) {
                    dayInstances.push(new Date(new Date(d).getUTCDate()).toISOString().split('T')[0]);
                    d.setDate(d.getDate() + 7);
                }

                return dayInstances;
            }

            let dayInstances = findAllInstancesOfDay(todaysDayIndex, todaysDate);
            if (dayInstances.includes(todaysDate)) {
                isDayMatching = true;
            }
        }

        return isDayMatching;
    }

    // checkPatternMonth is to determine if today's month falls in alignment with the month pattern given for the todo 
    function checkPatternMonth(dateTime, todaysDate, todo) {
                // MONTH
        // Huge thanks to Shyam Habarakada https://stackoverflow.com/a/15289883/18628118 for providing a solution for calculating time difference.
        let isMonthMatching = false;
        if (dateTime.month.monthEquation.first !== '' || dateTime.month.monthEquation.second !== '') {
            let firstNum = dateTime.month.monthEquation.first === '' ? 1 : dateTime.month.monthEquation.first;
            let secondNum = dateTime.month.monthEquation.second === '' ? 0 : dateTime.month.monthEquation.second;
            let creationDate = new Date(new Date(todo.creationDate).toUTCString()).toISOString().split('T')[0];
            const difference = ((new Date(todaysDate).getUTCFullYear() - new Date(creationDate).getUTCFullYear()) * 12) + (new Date(todaysDate).getUTCMonth() - new Date(creationDate).getUTCMonth());

            // isFollowingEquation is to figure out if 
            // today's date happens to land somewhere on the equation 
            // the user gave, based on when the creation date was.
            const isFollowingEquation = (difference - secondNum) % firstNum === 0;
            if (isFollowingEquation) {
                isMonthMatching = true; 
            }
        } else if (dateTime.month.isEveryMonthOfYear === true) {
            if (dateTime.month.months.length === 0) {
                isMonthMatching = true;
            } else {
                let todaysMonthIndex = new Date(todaysDate).getUTCMonth()
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let todaysMonth = monthNames[todaysMonthIndex];
                if (dateTime.month.months.includes(todaysMonth) === true) {
                    isMonthMatching = true;
                }
            }
        }

        return isMonthMatching;
    }

    // checkPatternYear is to determine if today's year falls in alignment with the year pattern given for the todo 
    function checkPatternYear(dateTime, todaysDate, todo) {
                // YEAR
        // Huge thanks to Shyam Habarakada https://stackoverflow.com/a/15289883/18628118 for providing a solution for calculating time difference.
        let isYearMatching = false;
        if (dateTime.year.yearEquation.first !== '' || dateTime.year.yearEquation.second !== '') {
            let firstNum = dateTime.year.yearRange.first === '' ? 1 : dateTime.year.yearRange.first;
            let secondNum = dateTime.year.yearRange.second === '' ? 0 : dateTime.year.yearRange.second;
            let creationDate = new Date(new Date(todo.creationDate).toUTCString()).toISOString().split('T')[0];
            const difference = new Date(todaysDate).getUTCFullYear() - new Date(creationDate).getUTCFullYear();

            // isFollowingEquation is to figure out if 
            // today's date happens to land somewhere on the equation 
            // the user gave, based on when the creation date was.
            const isFollowingEquation = (difference - secondNum) % firstNum === 0;
            if (isFollowingEquation) {
                isYearMatching = true; 
            }
        } else if (dateTime.year.yearRange.start !== '' || dateTime.year.yearRange.end !== '') {
            // change year range part of form so that either the start or the end can be left blank.
            let todaysYear = new Date(todaysDate).getUTCFullYear();
            let start = dateTime.year.yearRange.start;
            let end = dateTime.year.yearRange.end;

            if (start === '') {
                if (todaysYear > start) {
                    isYearMatching = true; 
                }
            } else if (end === '') {
                if (todaysYear < end) {
                    isYearMatching = true; 
                }
            }
        } else if (dateTime.year.isEveryYear === true) {
            isYearMatching = true;
        } else if (dateTime.year.years.length > 0) {
            let todaysYear = new Date(todaysDate).getUTCFullYear().toString();
            if (dateTime.year.years.includes(todaysYear) === true) {
                isYearMatching = true;
            }
        }

        return isYearMatching;
    }

    // checkPatternDate combines and executes checkPatternDay, checkPatternMonth, and checkPatternYear
    function checkPatternDate(todo) {
        const dateTime = todo.reminderFrequency[0]
        let todaysDate = new Date(new Date(Date.now()).toLocaleDateString()).toISOString().split('T')[0];

        let isDayMatching = false;
        let isMonthMatching = false;
        let isYearMatching = false;

        // test every property of todaysDate against the pattern.
        // Notifications.jsx will worry about times.
        isDayMatching = checkPatternDay(dateTime, todaysDate, todo);
        isMonthMatching = checkPatternMonth(dateTime, todaysDate, todo);
        isYearMatching = checkPatternYear(dateTime, todaysDate, todo);
        
        if (isDayMatching && isMonthMatching && isYearMatching) {
            return true;
        } else {
            return false;
        }
    }

    // checkTodoDate determines if the reminder frequency is specified or is a pattern, 
    // then will determine if today's date aligns with that reminder frequency by returning true or false
    function checkTodoDate(todo) {
        if (todo.reminderFrequency[0].hasOwnProperty('date') === true) {
            return checkSpecifiedDate(todo);
        } else if (todo.reminderFrequency[0].hasOwnProperty('date') === false) {
            return checkPatternDate(todo);
        }
    }
    
    // getTodaysTodos returns a filtered array based on if 
    // checkTodoDate returns true or false for that particular todo.
    function getTodaysTodos(todos) {
        let todaysTodos = [...todos].filter(todo => {
            return checkTodoDate(todo);
        })
        return todaysTodos;
    }

    // useMemo is used just in case if someone has a 
    // busy schedule, to prevent todaysTodosFiltered 
    // from being recalculated too much

    const todaysTodosFiltered = useMemo(() => {
        let todaysTodos = getTodaysTodos(todos)
        return todaysTodos;
    }, [todos])

    return (
        <>
            <Notifications
                todaysTodosFiltered={todaysTodosFiltered}
                deactivatedTodaysTodos={deactivatedTodaysTodos}
                setCurrentAnimation={setCurrentAnimation}
            />
            <ProjectCanvas 
                todos={todos} 
                setTodos={setTodos} 
                currentPanel={currentPanel} 
                setCurrentPanel={setCurrentPanel} 
                deactivatedTodaysTodos={deactivatedTodaysTodos}
                setDeactivatedTodaysTodos={setDeactivatedTodaysTodos}
                todaysTodosFiltered={todaysTodosFiltered}
                currentAnimation={currentAnimation}
                setCurrentAnimation={setCurrentAnimation}
            />
        </>
    )
}