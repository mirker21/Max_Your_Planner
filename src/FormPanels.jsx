import { useState } from "react";
import { Html } from "@react-three/drei";
import { generateUUID } from "three/src/math/MathUtils";

import FormCategory from "./todo/FormCategory";
import FormSubcategory from "./todo/FormSubcategory";
import FormItemName from "./todo/FormItemName";
import FormReminderFrequencyPattern from "./todo/FormReminderFrequencyPattern";
import FormReminderFrequencySpecified from "./todo/FormReminderFrequencySpecified";
import FormReminderFrequencySwitch from "./todo/FormReminderFrequencySwitch";

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
        selectedTodo === ''
        ? 
        false
        : 
        todos.findIndex(todo => todo.id === selectedTodo).reminderFrequency.length > 1
        ?
        false
        :
        true
    );

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
        setCurrentPanel('')
        console.log('submitted!', newTodos)
    }

    // Figure out how to edit entries
    // function handleConfirmEditEntry(event) {
    //     event.preventDefault();
    //     const newTodos = [...todos];
    //     const newTodo = {
    //         id: generateUUID(),
    //         category: category,
    //         subcategory: subcategory,
    //         reminderFrequency: [...datesTimes],
    //         checklist: [...checklist]
    //     };
    //     newTodos.push(newTodo);
    //     setTodos([...newTodos]);
    //     console.log('submitted!', newTodos)
    //     setSelectedTodo('');
    // }

    let addTodoButtonDisplay = false;

    if (datesTimes.length > 0 && category !== '' && subcategory !== '') {
        addTodoButtonDisplay = true;
    }

    let selectedTodoInfo = '';
    selectedTodoInfo = todos[todos.findIndex(todo => todo.id === selectedTodo)];

    let leftPanel = (
        <FormPanelLeft
            previousCategories={previousCategories}
            category={category}
            setCategory={setCategory}
            previousSubcategories={previousSubcategories}
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
            selectedTodoInfo={selectedTodoInfo}
            addTodoButtonDisplay={addTodoButtonDisplay}
        />
    )

    if (isWide === true) {
        return (
            <>
                <Html scale={scale} className="dialog-container" position={leftPosition} transform sprite>
                    <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                        {leftPanel}
                    </form>
                </Html>

                <Html scale={scale} className="dialog-container" position={rightPosition} transform sprite>
                    <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                        {rightPanel}
                    </form>
                </Html>
            </>
        )
    } else {
        return (
            <Html scale={scale} className="dialog-container" position={width < 1800 ? topPosition : rightPosition} transform sprite>
                <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>            
                    {leftPanel}
                    {rightPanel}
                </form>
            </Html>
        )
    }
}

function FormPanelLeft({
    previousCategories,
    category,
    setCategory,
    previousSubcategories,
    subcategory,
    setSubcategory,
    checklist,
    setChecklist,
    todo,
    setTodo,
    selectedTodoInfo
}) {
    return (
        <div className="left-panel">
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
        </div>
    )
}

function FormPanelRight({
    isDatePattern,
    setIsDatePattern,
    setDatesTimes,
    currentYear,
    datesTimes,
    selectedTodoInfo,
    addTodoButtonDisplay
}) {
    return (
        <div className="right-panel">
            <div>
                <FormReminderFrequencySwitch 
                    isDatePattern={isDatePattern} 
                    setIsDatePattern={setIsDatePattern}
                    setDatesTimes={setDatesTimes}
                    selectedTodoInfo={selectedTodoInfo}
                />

                {
                    isDatePattern === true
                    ?
                    <FormReminderFrequencyPattern
                        currentYear={currentYear}
                        setDatesTimes={setDatesTimes}
                        selectedTodoInfo={selectedTodoInfo}
                    />
                    :
                    <FormReminderFrequencySpecified
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
        </div>   
    )
}