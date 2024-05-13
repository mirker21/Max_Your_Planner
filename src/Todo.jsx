
import { useState, useEffect } from "react";
import Interface from "./components/Interface";
import TodaysTodosFilteredParent from "./components/TodaysTodosFilteredParent";
import MusicCredits from "./components/MusicCredits";

const birdsAudio = new Audio('./audio/148909__kvgarlic__creekandchickadee.wav')
const musicAudio = new Audio('./audio/Dewdrop Fantasy.mp3')

birdsAudio.loop = true;
musicAudio.loop = true;
birdsAudio.volume = 0.5;
musicAudio.volume = 0.5;

export default function Todo({
    currentPanel,
    setCurrentPanel,
}) {
    const [todos, setTodos] = useState([]);

    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('Greet');

    useEffect(() => {
        // Every 24 hours, the todos state will get set again,
        // causing todaysTodosFiltered to update, which will then
        // recreate the toasts that need to be shown for the day. 

        // First, we need to check how close 
        // right now is to the next day at midnight,
        // because after that time has passed,
        // we can now start filtering out next day's
        // todos, as we want to ensure that every 
        // notification for the next day, wherever 
        // its planned time is set to be, will get their  
        // delays calculated right as the next day starts.
        let todaysDateAndTime = new Date(Date.now()).toString().split(' ').slice(0, 5).join(' ')
        let nextDayNum = parseInt(todaysDateAndTime.toString().split(' ')[2]) + 1
        let tomorrowsDate = todaysDateAndTime.toString().split(' ')
        tomorrowsDate[2] = nextDayNum;
        let tomorrowsDateStr = tomorrowsDate.join(' ')
        let tomorrowsMidnightDate = new Date(tomorrowsDateStr).toString().split(' ').slice(0, 4).join(' ') + ' 00:00:00'
        let milisecondsUntilMidnightTomorrow = new Date(tomorrowsMidnightDate).getTime() - new Date(todaysDateAndTime).getTime()

        // The variable for the timeout and interval
        let nextDay;

        // We want startTimeout to fulfill a promise as soon as the timeout has completed.
        // Huge thanks to Jasmin Virdi from https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc, Hasibul Islam 
        // from https://www.linkedin.com/pulse/how-use-asyncawait-react-useeffect-hook-hasibul-islam#:~:text=One%20straightforward%20way%20to%20solve,catch%20(err)%20%7B%20console,
        // and Estus Flask from https://stackoverflow.com/a/54159114 
        // for providing examples of how to use asynchronous functions, and how to use them inside of a useEffect.
        // Huge thanks to traktor from https://stackoverflow.com/a/77028676/18628118 for
        // providing an explanation as to why await is necessary within startTwentyFourHourInterval.

        async function startTimeout() {
            if (milisecondsUntilMidnightTomorrow > 0) {
                await new Promise((resolve) => {
                    // setTimeout will only happen once, as the
                    // next day will be started at exactly midnight.
                    nextDay = setTimeout(() => {
                        setTodos([...todos])
                        milisecondsUntilMidnightTomorrow = 0;
                        resolve();
                    }, milisecondsUntilMidnightTomorrow)}
                )
            }
        }
        
        const startTwentyFourHourInterval = async () => {
            await startTimeout()
            .then(() => {
                    if (milisecondsUntilMidnightTomorrow === 0) {
                        milisecondsUntilMidnightTomorrow = 0;
                        clearTimeout(nextDay)
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
        <div id="todo-app-container">
            <header id="app-title-container" aria-label="Max Your Planner">
                <h1 id="app-title">Max Your Planner</h1>
            </header>
            <main id="3d-and-interface-components-container">
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
                <TodaysTodosFilteredParent 
                    todos={todos}
                    setTodos={setTodos}
                    currentPanel={currentPanel}
                    setCurrentPanel={setCurrentPanel}
                    currentAnimation={currentAnimation}
                    setCurrentAnimation={setCurrentAnimation}
                />
            </main>
            <footer id="music-credits" aria-label="Music and Sounds Credits">
                <MusicCredits />
            </footer>
        </div>
    )
}