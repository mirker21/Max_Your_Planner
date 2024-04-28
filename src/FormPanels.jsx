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
        todos[todos.findIndex(todo => todo.id === selectedTodo)].reminderFrequency.length > 1 
        || 
        todos[todos.findIndex(todo => todo.id === selectedTodo)].reminderFrequency[0].hasOwnProperty('date') === true
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
        console.log('submitted!', newTodos)
    }

    // Figure out how to edit entries
    function handleConfirmEditEntry(event) {
        event.preventDefault();
        const newTodos = [...todos];
        console.log('WHOOOOO!', todos[todos.findIndex(todo => todo.id === selectedTodo)].creationDate)
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
        console.log('submitted!', newTodos)
        setSelectedTodo('');
        setCurrentPanel('search-todos')
        setCurrentAnimation('Idle')
    }

    let addTodoButtonDisplay = false;

    if (datesTimes.length > 0 && category !== '' && subcategory !== '') {
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
                        currentYear={currentYear}
                        setDatesTimes={setDatesTimes}
                        selectedTodo={selectedTodo}
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
        </>   
    )
}