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

    function handleChange(event) {
        if (event.target.id === 'category-create' || event.target.id === 'category-select') {
            setCategory(event.target.value);
        } else if (event.target.id === 'subcategory-create' || event.target.id === 'subcategory-select') {
            setSubcategory(event.target.value);
        }
    }
    // function add item to list

    const categories = [...new Set(todos.map(todo => {
        return todo.category;
    }))]

    const subcategories = [...new Set(todos.map(todo => {
        return todo.subcategory;
    }))]

    let patternDisplay = {
        default: true,
        days: 'all',
        months: 'all',
        years: 'all'
    }

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
            <form>
                <FormCategory 
                    category={category} 
                    setCategory={setCategory}
                    handleChange={handleChange} 
                />

                <FormSubcategory 
                    category={subcategory} 
                    setCategory={setSubcategory}
                    handleChange={handleChange} 
                />

                <div>
                    <FormReminderFrequencySwitch 
                        isDatePattern={isDatePattern} 
                        setIsDatePattern={setIsDatePattern}
                        setDatesTimes={setDatesTimes}
                        handleChange={handleChange}
                    />

                    {
                        isDatePattern === true
                        ?
                        <FormReminderFrequencyPattern
                            currentYear={currentYear}
                            patternDisplay={patternDisplay}
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