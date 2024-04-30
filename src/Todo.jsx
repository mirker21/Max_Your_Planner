
import { useState, useEffect } from "react";
import Interface from "./components/Interface";
import TodaysTodosFilteredParent from "./components/TodaysTodosFilteredParent";
import MusicCredits from "./components/MusicCredits";

const birdsAudio = new Audio('./audio/148909__kvgarlic__creekandchickadee.wav')
const musicAudio = new Audio('./audio/Dewdrop Fantasy.mp3')

birdsAudio.loop = true;
musicAudio.loop = true;
birdsAudio.volume = 0.5;
musicAudio.volume = 0.05;

export default function Todo() {
    const [todos, setTodos] = useState([]);

    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [currentPanel, setCurrentPanel] = useState('');
    const [currentAnimation, setCurrentAnimation] = useState('Greet');

    useEffect(() => {
        // Every 24 hours, the todos state will get set again,
        // causing todaysTodosFiltered to update. 

        let todaysDateAndTime = new Date(Date.now()).toString().split(' ').slice(0, 5).join(' ')
        let nextDayNum = parseInt(todaysDateAndTime.toString().split(' ')[2]) + 1
        let tomorrowsDate = todaysDateAndTime.toString().split(' ')
        tomorrowsDate[2] = nextDayNum;
        let tomorrowsDateStr = tomorrowsDate.join(' ')
        let tomorrowsMidnightDate = new Date(tomorrowsDateStr).toString().split(' ').slice(0, 4).join(' ') + ' 00:00:00'
        let milisecondsUntilMidnightTomorrow = new Date(tomorrowsMidnightDate).getTime() - new Date(todaysDateAndTime).getTime()

        let nextDay;

        async function startTimeout() {
            if (milisecondsUntilMidnightTomorrow > 0) {
                clearTimeout(nextDay)
                clearInterval(nextDay)
                await new Promise((resolve) => {
                    nextDay = setTimeout(() => {
                        todaysDateAndTime = new Date(Date.now()).toString().split(' ').slice(0, 5).join(' ')
                        nextDayNum = parseInt(todaysDateAndTime.toString().split(' ')[2]) + 1
                        tomorrowsDate = todaysDateAndTime.toString().split(' ')
                        tomorrowsDate[2] = nextDayNum;
                        tomorrowsDateStr = tomorrowsDate.join(' ')
                        tomorrowsMidnightDate = new Date(tomorrowsDateStr).toString().split(' ').slice(0, 4).join(' ') + ' 00:00:00'
                        milisecondsUntilMidnightTomorrow = new Date(tomorrowsMidnightDate).getTime() - new Date(todaysDateAndTime).getTime()
                        setTodos([...todos])
                        resolve();
                    }, milisecondsUntilMidnightTomorrow)}
                )
            }
        }
        
        const startTwentyFourHourInterval = async () => {
            await startTimeout()
            .then(() => {
                console.log('timeout is over!')
                    if (milisecondsUntilMidnightTomorrow <= 0) {
                        milisecondsUntilMidnightTomorrow = 0;
                        clearTimeout(nextDay)
                        clearInterval(nextDay)
                        nextDay = setInterval(() => {
                            setTodos([...todos])
                        }, 60 * 60 * 24 * 1000)
                    }
                }
            )
        }

        startTwentyFourHourInterval()

        return () => {
            clearTimeout(nextDay)
            clearInterval(nextDay)
        }
    }, [])
    
    return (
        <div id="todo-container">
            <div id="app-title-container">
                <h1 id="app-title">Max Your Planner</h1>
            </div>
            <TodaysTodosFilteredParent 
                todos={todos}
                setTodos={setTodos}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                currentAnimation={currentAnimation}
                setCurrentAnimation={setCurrentAnimation}
            />
            <Interface
                isSoundOn={isSoundOn}
                setIsSoundOn={setIsSoundOn}
                isMusicOn={isMusicOn}
                setIsMusicOn={setIsMusicOn}
                birdsAudio={birdsAudio}
                musicAudio={musicAudio}
                setCurrentPanel={setCurrentPanel}
                setCurrentAnimation={setCurrentAnimation}
            />
            <MusicCredits />
        </div>
    )
}