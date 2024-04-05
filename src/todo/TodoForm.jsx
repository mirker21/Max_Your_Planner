import { useState } from "react";
import FormCategory from "./FormCategory";
import FormSubcategory from "./FormSubcategory";
import FormItemName from "./FormItemName";
import FormReminderFrequencyPattern from "./FormReminderFrequencyPattern";
import FormReminderFrequencySpecified from "./FormReminderFrequencySpecified";
import FormReminderFrequencySwitch from "./FormReminderFrequencySwitch";

export function FullFormPanel({
    width, 
    todos, 
    setTodos, 
    currentPanel, 
    previousCategories, 
    previousSubcategories,
    selectedTodo,
    setSelectedTodo
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

    console.log('TODO FORM!')

    let addTodoButtonDisplay = false;

    if (datesTimes.length > 0 && category !== '' && subcategory !== '') {
        addTodoButtonDisplay = true;
    }

    let selectedTodoInfo = todos[todos.findIndex(todo => todo.id === selectedTodo)];

    const leftPanel = (
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

    const rightPanel = (
        <FormPanelRight
            isDatePattern={isDatePattern}
            setIsDatePattern={setIsDatePattern}
            setDatesTimes={setDatesTimes}
            currentYear={currentYear}
            datesTimes={datesTimes}
            selectedTodoInfo={selectedTodoInfo}
        />
    )

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
    // }

    if (width > 2) {

        let leftPanelForm = (
            <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                {leftPanel}
            </form>
        )
        
        let rightPanelForm = (
            <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>
                {rightPanel}
            </form>
        )

        return {
            leftPanelForm,
            rightPanelForm
        }
    } else {

        let fullPanel = (
            <form onSubmit={currentPanel === 'add-new-todo' ? handleSubmitTodoEntry : handleConfirmEditEntry}>        
                {leftPanel}
                {rightPanel}
            </form>
        )

        console.log('full panel!', fullPanel)

        return {
            fullPanel
        }
    }
}

export function FormPanelLeft({
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

export function FormPanelRight({
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