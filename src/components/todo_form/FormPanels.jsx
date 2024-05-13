import { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { generateUUID, lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import { A11y } from "@react-three/a11y";

import FormCategory from "./FormCategory";
import FormSubcategory from "./FormSubcategory";
import FormItemName from "./FormItemName";
import FormReminderFrequencyPattern from "./FormReminderFrequencyPattern";
import FormReminderFrequencySpecified from "./FormReminderFrequencySpecified";
import FormReminderFrequencySwitch from "./FormReminderFrequencySwitch";
import ClosePanelButton from "../ClosePanelButton";

export default function FormPanels({
    width,
    isWide,
    scale,
    todos,
    setTodos,
    currentPanel,
    setCurrentPanel,
    previousCategories,
    previousSubcategories,
    selectedTodo,
    setSelectedTodo,
    leftPosition,
    rightPosition,
    topPosition,
    setCurrentAnimation
}) {
    const [category, setCategory] = useState(
        currentPanel === 'add-new-todo' 
        ? 
        ''
        : 
        todos[todos.findIndex(todo => todo.id === selectedTodo)].category 
    );
    const [subcategory, setSubcategory] = useState(
        currentPanel === 'add-new-todo' 
        ? 
        ''
        : 
        todos[todos.findIndex(todo => todo.id === selectedTodo)].subcategory
    );
    const [todo, setTodo] = useState('')
    // datesTimes is an array of objects, which each 
    // contain an id, date, and array of times for that date.
    // This state is needed for specified reminder frequencies.
    const [datesTimes, setDatesTimes] = useState(
        currentPanel === 'add-new-todo' 
        ? 
        []
        : 
        [...todos[todos.findIndex(todo => todo.id === selectedTodo)].reminderFrequency]
    )
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [checklist, setChecklist] = useState(
        currentPanel === 'add-new-todo' 
        ? 
        []
        : 
        [...todos[todos.findIndex(todo => todo.id === selectedTodo)].checklist]
    );
    const [isDatePattern, setIsDatePattern] = useState(
        (selectedTodo === '' || todos[todos.findIndex(todo => todo.id === selectedTodo)].reminderFrequency[0].hasOwnProperty('date') === true)
        ? 
        false
        : 
        true
    );

    function handleSubmitTodoEntry(event) {
        event.preventDefault();
        const newTodos = [...todos];
        const newTodo = {
            // the creation date is to show where today's date is
            // in terms of the reminder frequency pattern equations
            creationDate: new Date(Date.now()).toString(),
            id: generateUUID(),
            category: category,
            subcategory: subcategory,
            reminderFrequency: [...datesTimes],
            checklist: [...checklist]
        };
        newTodos.push(newTodo);
        setTodos([...newTodos]);
        setCurrentPanel('')
        setCurrentAnimation('Idle')
    }

    function handleConfirmEditEntry(event) {
        event.preventDefault();
        const newTodos = [...todos];
        let revisedTodo = {
            creationDate: todos[todos.findIndex(todo => todo.id === selectedTodo)].creationDate,
            id: selectedTodo,
            category: category,
            subcategory: subcategory,
            reminderFrequency: [...datesTimes],
            checklist: [...checklist]
        };
        let replaceTodoIndex = newTodos.findIndex(todo => todo.id === selectedTodo);
        newTodos.splice(replaceTodoIndex, 1, revisedTodo)
        setTodos([...newTodos]);
        setSelectedTodo('');
        setCurrentPanel('search-todos')
        setCurrentAnimation('Searching')
    }

    let addTodoButtonDisplay = false;

    if (datesTimes.length > 0 && category !== '' && subcategory !== '' && checklist.length > 0) {
        addTodoButtonDisplay = true;
    }

    let selectedTodoInfo = '';
    selectedTodoInfo = todos[todos.findIndex(todo => todo.id === selectedTodo)];

    let leftPanel = (
        <FormPanelLeft
            previousCategories={previousCategories}
            previousSubcategories={previousSubcategories}
            category={category}
            setCategory={setCategory}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            checklist={checklist}
            setChecklist={setChecklist}
            todo={todo}
            setTodo={setTodo}
            selectedTodoInfo={selectedTodoInfo}
        />
    )

    let rightPanel = (
        <FormPanelRight
            isDatePattern={isDatePattern}
            setIsDatePattern={setIsDatePattern}
            setDatesTimes={setDatesTimes}
            currentYear={currentYear}
            datesTimes={datesTimes}
            selectedTodo={selectedTodo}
            selectedTodoInfo={selectedTodoInfo}
            addTodoButtonDisplay={addTodoButtonDisplay}
        />
    )

    const fullPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const leftPanelRef = useRef(null);

    // Huge thanks to Ask-Alice from https://www.reddit.com/r/threejs/comments/lg54ko/fade_animation_when_changing_views_react_three/ for showing a method to change transparency of element.
    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "add-new-todo" || currentPanel === "edit-todo"  ? 1 : 0, 0.1);
        } else if (leftPanelRef.current !== null && rightPanelRef.current !== null) {
            leftPanelRef.current.style.opacity = lerp(leftPanelRef.current.style.opacity, currentPanel === "add-new-todo" || currentPanel === "edit-todo" ? 1 : 0, 0.1);
            rightPanelRef.current.style.opacity = lerp(rightPanelRef.current.style.opacity, currentPanel === "add-new-todo" || currentPanel === "edit-todo" ? 1 : 0, 0.1);
        }
    })

    if (isWide === true) {
        return (
            <>
                <A11y role="content" description="Add/Edit Todo Panel Left, contains inputs for category, subcategory, and to-do list items. The two panels merge into one when the width of the window is smaller.">
                    <Html ref={leftPanelRef} scale={scale} className="dialog-container" position={leftPosition} transform sprite>
                        <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                            {leftPanel}
                        </form>
                        <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                    </Html>
                </A11y>
                <A11y role="content" description="Add/Edit Todo Panel Right, contains all the inputs for specified and pattern reminder frequency. The two panels merge into one when the width of the window is smaller.">
                    <Html ref={rightPanelRef} scale={scale} className="dialog-container" position={rightPosition} transform sprite>
                        <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                            {rightPanel}
                        </form>
                        <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                    </Html>
                </A11y>
            </>
        )
    } else {
        return (
            <A11y role="content" description="Add/Edit Todo Panel Full, contains all inputs to add or edit a todo. The Full Panel splits into two when the width of the window is larger.">
                <Html ref={fullPanelRef} scale={scale} className="dialog-container top-dialog-container" position={width < 1800 ? topPosition : rightPosition} transform sprite>
                    <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>            
                        {leftPanel}
                        {rightPanel}
                    </form>
                    <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                </Html>
            </A11y>
        )
    }
}

function FormPanelLeft({
    previousCategories,
    previousSubcategories,
    category,
    setCategory,
    subcategory,
    setSubcategory,
    checklist,
    setChecklist,
    todo,
    setTodo,
    selectedTodoInfo
}) {
    return (
        <>
            <FormCategory 
                previousCategories={previousCategories}
                category={category} 
                setCategory={setCategory}
                selectedTodoInfo={selectedTodoInfo}
            />
    
            <FormSubcategory 
                previousSubcategories={previousSubcategories}
                subcategory={subcategory} 
                setSubcategory={setSubcategory}
                selectedTodoInfo={selectedTodoInfo}
            />
            
            <FormItemName 
                checklist={checklist} 
                setChecklist={setChecklist}
                todo={todo}
                setTodo={setTodo}
                selectedTodoInfo={selectedTodoInfo}
            />
        </>
    )
}

function FormPanelRight({
    isDatePattern,
    setIsDatePattern,
    setDatesTimes,
    currentYear,
    datesTimes,
    selectedTodoInfo,
    addTodoButtonDisplay,
    selectedTodo,
}) {
    // useEffect in formreminderFrequencySwitch?
    return (
        <>
            <div>
                <FormReminderFrequencySwitch 
                    isDatePattern={isDatePattern} 
                    setIsDatePattern={setIsDatePattern}
                    setDatesTimes={setDatesTimes}
                    selectedTodoInfo={selectedTodoInfo}
                />
            </div>

            <div className={isDatePattern === true ? "pattern-or-specified-section pattern" : "pattern-or-specified-section"}>
                {
                    isDatePattern === true
                    ?
                    <FormReminderFrequencyPattern
                        isDatePattern={isDatePattern}
                        currentYear={currentYear}
                        setDatesTimes={setDatesTimes}
                        selectedTodo={selectedTodo}
                        selectedTodoInfo={selectedTodoInfo}
                        // if selectedTodoInfo is blank put something else
                    />
                    :
                    <FormReminderFrequencySpecified
                        isDatePattern={isDatePattern}
                        datesTimes={datesTimes}
                        setDatesTimes={setDatesTimes}
                        selectedTodoInfo={selectedTodoInfo}
                    />
                }
            </div>
            
            {
                addTodoButtonDisplay === true
                &&
                <button type="submit">Add Entry To Collection</button>
            }
        </>   
    )
}