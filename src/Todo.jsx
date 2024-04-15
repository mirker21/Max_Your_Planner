
import { useState, useRef, useEffect } from "react";
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import FormCategory from "./todo/FormCategory";
import FormSubcategory from "./todo/FormSubcategory";
import FormReminderFrequencySpecified from "./todo/FormReminderFrequencySpecified";
import FormReminderFrequencyPattern from "./todo/FormReminderFrequencyPattern";
import FormItemName from "./todo/FormItemName";
import FormReminderFrequencySwitch from "./todo/FormReminderFrequencySwitch";
import { generateUUID } from "three/src/math/MathUtils";
import ProjectCanvas from "./ProjectCanvas";
import Interface from "./components/Interface";
import Notifications from "./components/Notifications";
import TodaysTodosFilteredParent from "./TodaysTodosFilteredParent";

const birdsAudio = new Audio('./audio/148909__kvgarlic__creekandchickadee.wav')
const musicAudio = new Audio('./audio/Dewdrop Fantasy.mp3')

birdsAudio.loop = true;
musicAudio.loop = true;

export default function Todo() {
    const [todos, setTodos] = useState([]);

    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [isVoiceOverOn, setIsVoiceOverOn] = useState(false)
    const [currentPanel, setCurrentPanel] = useState('')

    function checkSpecifiedDate(todo) {
        const todaysDate = new Date(new Date(Date.now()).toLocaleDateString()).toISOString().split('T')[0];
        todo.reminderFrequency.map(dateTime => {
            const todoDate = new Date(new Date(dateTime.date).toUTCString()).toISOString().split('T')[0];
            return todoDate === todaysDate;
        })
    }

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
                console.log('dayequation')
                isDayMatching = true;
            }
        } else if (dateTime.day.isEveryDayOfWeekEachMonth === true) {
            if (dateTime.day.days.length === 0) {
                console.log('every day')
                isDayMatching = true;
            } else {
                let todaysDayIndex = new Date(todaysDate).getUTCDay()
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let todaysDay = dayNames[todaysDayIndex];
                if (dateTime.day.days.includes(todaysDay) === true) {
                    console.log('isEveryDayOfWeekEachMonth')
                    isDayMatching = true;
                }
            }
        } else if (dateTime.day.everyNthDayOfWeekEachMonth.length > 0) {
            console.log('everynthday?')
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
                console.log('everyNthDayOfWeekEachMonth')
                isDayMatching = true;
            }
        }

        return isDayMatching;
    }

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
                console.log('monthequation')
                isMonthMatching = true; 
            }
        } else if (dateTime.month.isEveryMonthOfYear === true) {
            if (dateTime.month.months.length === 0) {
                console.log('every month')
                isMonthMatching = true;
            } else {
                let todaysMonthIndex = new Date(todaysDate).getUTCMonth()
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let todaysMonth = monthNames[todaysMonthIndex];
                if (dateTime.month.months.includes(todaysMonth) === true) {
                    console.log('isEveryMonthOfYear')
                    isMonthMatching = true;
                }
            }
        }

        return isMonthMatching;
    }

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
                console.log('yearequation')
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
                console.log('years')
                isYearMatching = true;
            }
        }

        return isYearMatching;
    }

    function checkPatternDate(todo) {
        console.log('checkpatterndate')
        const dateTime = todo.reminderFrequency[0]
        let todaysDate = new Date(new Date(Date.now()).toLocaleDateString()).toISOString().split('T')[0];

        let isDayMatching = false;
        let isMonthMatching = false;
        let isYearMatching = false;

        // test every property of todaysDate against the pattern. No need to worry about times.
        isDayMatching = checkPatternDay(dateTime, todaysDate, todo);
        isMonthMatching = checkPatternMonth(dateTime, todaysDate, todo);
        isYearMatching = checkPatternYear(dateTime, todaysDate, todo);

        console.log('isDayMatching', isDayMatching)
        console.log('isMonthMatching', isMonthMatching)
        console.log('isYearMatching', isYearMatching)
        
        if (isDayMatching && isMonthMatching && isYearMatching) {
            console.log(true)
            return true;
        } else {
            console.log(false)
            return false;
        }
    }

    function checkTodoDate(todo) {
        if (todo.reminderFrequency[0].hasOwnProperty('date') === true) {
            return checkSpecifiedDate(todo);
        } else if (todo.reminderFrequency[0].hasOwnProperty('date') === false) {
            console.log('HAHA')
            return checkPatternDate(todo);
        }
    }
    
    function getTodaysTodos(todos) {
        let todaysTodos = [...todos].filter(todo => {
            return checkTodoDate(todo);
        })
        return todaysTodos;
    }

    console.log('whee')

    useEffect(() => {
        // Every 24 hours, the todos state will get set again,
        // causing todaysTodosFiltered to update. 

        let nextDay = setTimeout(() => {
            setTodos([...todos])
        }, 60 * 60 * 24 * 1000)

        return () => {
            clearTimeout(nextDay)
        }
    }, [])
    
    return (
        <div id="container">
            <TodaysTodosFilteredParent 
                todos={todos}
                setTodos={setTodos}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                getTodaysTodos={getTodaysTodos}
            />
            <Interface
                isSoundOn={isSoundOn}
                setIsSoundOn={setIsSoundOn}
                isMusicOn={isMusicOn}
                setIsMusicOn={setIsMusicOn}
                isVoiceOverOn={isVoiceOverOn}
                setIsVoiceOverOn={setIsVoiceOverOn}
                birdsAudio={birdsAudio}
                musicAudio={musicAudio}
                currentPanel={currentPanel} 
                setCurrentPanel={setCurrentPanel}
            />
            <span>
                "Dewdrop Fantasy" Kevin MacLeod (incompetech.com)
                Licensed under Creative Commons: By Attribution 4.0 License
                http://creativecommons.org/licenses/by/4.0/
            </span>
            <a href="https://freesound.org/people/kvgarlic/sounds/148909/">CreekandChickadee.wav</a> by <a href="https://freesound.org/people/kvgarlic/">kvgarlic</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            
            {/* // form with categories and inventories
            // 3d model, unlock hat if you clear your list for the day
            // html speech bubble
            // take break screen?
            // praise message and quote */}
        </div>
    )
}