
import { useState, useRef } from "react";

import FormCategory from "./todo/FormCategory";
import FormSubcategory from "./todo/FormSubcategory";
import FormReminderFrequencySpecified from "./todo/FormReminderFrequencySpecified";
import FormReminderFrequencyPattern from "./todo/FormReminderFrequencyPattern";
import FormItemName from "./todo/FormItemName";
import FormReminderFrequencySwitch from "./todo/FormReminderFrequencySwitch";
import { generateUUID } from "three/src/math/MathUtils";
import ProjectCanvas from "./ProjectCanvas";
import Interface from "./components/Interface";

const birdsAudio = new Audio('./audio/148909__kvgarlic__creekandchickadee.wav')
const musicAudio = new Audio('./audio/Dewdrop Fantasy.mp3')

birdsAudio.loop = true;
musicAudio.loop = true;

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [todo, setTodo] = useState('')
    const [datesTimes, setDatesTimes] = useState([])
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [checklist, setChecklist] = useState([]);
    const [isDatePattern, setIsDatePattern] = useState(false);
    const [reminderFrequency, setReminderFrequency] = useState({})

    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [currentPanel, setCurrentPanel] = useState('')

    function handleSubmitTodoEntry(event) {
        event.preventDefault();
        const newTodos = [...todos];
        const newTodo = {
            id: generateUUID(),
            category: category,
            subcategory: subcategory,
            reminderFrequency: [...datesTimes],
            checklist: [...checklist]
        };
        newTodos.push(newTodo);
        setTodos([...newTodos]);
        console.log('submitted!', newTodos)
    }
    // function add item to list

    const previousCategories = [...new Set(todos.map(todo => {
        return todo.category;
    }))]

    const previousSubcategories = [...new Set(todos.map(todo => {
        return todo.subcategory;
    }))]

    let addTodoButtonDisplay = false;

    if (datesTimes.length > 0 && category !== '' && subcategory !== '') {
        addTodoButtonDisplay = true;
    }

    return (
        <div id="container">
            <ProjectCanvas todos={todos} setTodos={setTodos} currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} />
            <Interface
                isSoundOn={isSoundOn}
                setIsSoundOn={setIsSoundOn}
                isMusicOn={isMusicOn}
                setIsMusicOn={setIsMusicOn}
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