import { Canvas } from "@react-three/fiber"
import { useState } from "react";

import FormCategory from "./todo/FormCategory";
import FormSubcategory from "./todo/FormSubcategory";
import FormReminderFrequencySpecified from "./todo/FormReminderFrequencySpecified";
import FormReminderFrequencyPattern from "./todo/FormReminderFrequencyPattern";
import FormItemName from "./todo/FormItemName";
import FormReminderFrequencySwitch from "./todo/FormReminderFrequencySwitch";

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

    function submitEditedTodo(id) {
        console.log('lol')
    }

    function handleSubmitTodoEntry(event) {
        event.preventDefault();
        console.log('submitted!')
    }
    // function add item to list

    const previousCategories = [...new Set(todos.map(todo => {
        return todo.category;
    }))]

    const previousSubcategories = [...new Set(todos.map(todo => {
        return todo.subcategory;
    }))]

    return (
        <div>
            {/* <Canvas id="three-canvas">
                <PerspectiveCamera makeDefault position={[0, 25, 5]} />
                <OrbitControls />
                <ambientLight intensity={2} color="#FFFED0" />
                <directionalLight position={[0, 0, 10]} intensity={2} color="#FFFED0" />
                <Suspense fallback={null}>
                    
                </Suspense>
            </Canvas> */}
            <form onSubmit={handleSubmitTodoEntry}>
                <FormCategory 
                    previousCategories={previousCategories}
                    category={category} 
                    setCategory={setCategory}
                />

                <FormSubcategory 
                    previousSubcategories={previousSubcategories}
                    subcategory={subcategory} 
                    setSubcategory={setSubcategory}
                />

                <div>
                    <FormReminderFrequencySwitch 
                        isDatePattern={isDatePattern} 
                        setIsDatePattern={setIsDatePattern}
                        setDatesTimes={setDatesTimes}
                    />

                    {
                        isDatePattern === true
                        ?
                        <FormReminderFrequencyPattern
                            currentYear={currentYear}
                        />
                        :
                        <FormReminderFrequencySpecified
                            datesTimes={datesTimes}
                            setDatesTimes={setDatesTimes}
                        />
                    }
                </div>

                <FormItemName 
                    checklist={checklist} 
                    setChecklist={setChecklist}
                    todo={todo}
                    setTodo={setTodo}
                />

                <button type="submit">Add Entry To Collection</button>
            </form>
        </div>
        // form with categories and inventories
        // 3d model, unlock hat if you clear your list for the day
        // html speech bubble
        // take break screen?
        // praise message and quote
    )
}