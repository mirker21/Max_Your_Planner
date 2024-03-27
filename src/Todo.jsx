
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
    const [currentWindow, setCurrentWindow] = useState('Greet')

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
            <ProjectCanvas todos={todos} />
            <Interface

            />
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
                            setDatesTimes={setDatesTimes}
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
                
                {
                    addTodoButtonDisplay === true
                    &&
                    <button type="submit">Add Entry To Collection</button>
                }
            </form>
        </div>
        // form with categories and inventories
        // 3d model, unlock hat if you clear your list for the day
        // html speech bubble
        // take break screen?
        // praise message and quote
    )
}