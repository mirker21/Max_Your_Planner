
import { useState, useEffect } from "react";
import Interface from "./components/Interface";
import TodaysTodosFilteredParent from "./TodaysTodosFilteredParent";

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

    const [todaysDate, setTodaysDate] = useState('');

    useEffect(() => {
        // Every 24 hours, the todos state will get set again,
        // causing todaysTodosFiltered to update. 

        // provide proper timer?
        let newTodaysDate = new Date()

        let time = '';
        const todaysPlannedTime = new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ') + ' ' + time + ':00'
        setTodaysDate(newTodaysDate)

        let nextDay = setTimeout(() => {
            setTodos([...todos])
        }, 60 * 60 * 24 * 1000)

        return () => {
            clearTimeout(nextDay)
        }
    }, [])
    
    return (
        <div id="container">
            <span id="app-title-container">
                <h1 id="app-title">Max Your Planner</h1>
            </span>
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
        </div>
    )
}