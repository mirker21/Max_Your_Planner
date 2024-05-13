import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import SingleTodo from "./single_todo/SingleSearchTodo";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";
import { A11y } from "@react-three/a11y";
import ClosePanelButton from "./ClosePanelButton";

export default function SearchPanels({
    width,
    isWide,
    scale,
    todos,
    setTodos,
    setSelectedTodo,
    currentPanel,
    setCurrentPanel,
    leftPosition,
    rightPosition,
    topPosition,
    setCurrentAnimation,
}) {
    const [currentCategorySearchString, setCurrentCategorySearchString] = useState('');
    const [currentSubcategorySearchString, setCurrentSubcategorySearchString] = useState('');
    const [currentTodoSearchString, setCurrentTodoSearchString] = useState('');
    const [searchDatesTimes, setSearchDatesTimes] = useState('');

    function handleChange(event) {
        if (event.target.id === 'search-todos-category-input') {
            setCurrentCategorySearchString(event.target.value)
        } else if (event.target.id === 'search-todos-category-input') {
            setCurrentSubcategorySearchString(event.target.value)
        } else if (event.target.id === 'search-todos-name-input') {
            setCurrentTodoSearchString(event.target.value)
        } else if (event.target.id === 'search-todos-specified-input') {
            if (searchDatesTimes === 'specified') {
                setSearchDatesTimes('')
            } else {
                setSearchDatesTimes('specified')
            }
        } else if (event.target.id === 'search-todos-pattern-input') {
            if (searchDatesTimes === 'pattern') {
                setSearchDatesTimes('')
            } else {
                setSearchDatesTimes('pattern')
            }
        }
    }

    function handleDeleteTodo(id) {
        let newTodos = [...todos];

        newTodos = newTodos.filter(todo => todo.id !== id)
        setTodos([...newTodos])
    }

    let filteredTodos = [...todos];

    if (currentCategorySearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            return todo.category.includes(currentCategorySearchString);
        })
    } 
    
    if (currentSubcategorySearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            return todo.subcategory.includes(currentSubcategorySearchString);
        })
    } 
    
    if (currentTodoSearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            return todo.checklist.some(item => item.todo.includes(currentTodoSearchString)) === true;
        })
    }
    
    if (searchDatesTimes === 'specified') {
        filteredTodos = filteredTodos.filter(todo => {
            return todo.reminderFrequency[0].hasOwnProperty('date') === true;
        })
    } else if (searchDatesTimes === 'pattern') {
        filteredTodos = filteredTodos.filter(todo => {
            return todo.reminderFrequency[0].hasOwnProperty('date') === false;
        })
    }

    let leftPanel = (
        <SearchPanelLeft
            handleChange={handleChange}
            currentCategorySearchString={currentCategorySearchString}
            currentSubcategorySearchString={currentSubcategorySearchString}
            currentTodoSearchString={currentTodoSearchString}
            searchDatesTimes={searchDatesTimes}
        />
    )

    let rightPanel = (
        <SearchPanelRight
            handleDeleteTodo={handleDeleteTodo}
            todos={todos}
            setTodos={setTodos}
            setSelectedTodo={setSelectedTodo}
            currentPanel={currentPanel}
            setCurrentPanel={setCurrentPanel}
            filteredTodos={filteredTodos}
            setCurrentAnimation={setCurrentAnimation}
        />
    )
    
    const fullPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const leftPanelRef = useRef(null);

    // Huge thanks to Ask-Alice from https://www.reddit.com/r/threejs/comments/lg54ko/fade_animation_when_changing_views_react_three/ for showing a method to change transparency of element.
    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "search-todos" ? 1 : 0, 0.1);
        } else if (leftPanelRef.current !== null && rightPanelRef.current !== null) {
            leftPanelRef.current.style.opacity = lerp(leftPanelRef.current.style.opacity, currentPanel === "search-todos" ? 1 : 0, 0.1);
            rightPanelRef.current.style.opacity = lerp(rightPanelRef.current.style.opacity, currentPanel === "search-todos" ? 1 : 0, 0.1);
        }
    })

    if (isWide === true) {
        return (
            <>
                <A11y role="content" description="Search Panel Split Left, contains inputs for filtering to-do s. The two panels merge into one when the width of the window is smaller.">
                    <Html ref={leftPanelRef} scale={scale} className="dialog-container" position={leftPosition} transform sprite>
                        <form>
                            {leftPanel}
                        </form>
                        <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                    </Html>
                </A11y>

                <A11y role="content" description="Search Panel Split Right, contains all the filtered to-do s. The two panels merge into one when the width of the window is smaller.">
                    <Html ref={rightPanelRef} scale={scale} className="dialog-container" position={rightPosition} transform sprite>
                        <form>
                            {rightPanel}
                        </form>
                        <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                    </Html>
                </A11y>
            </>
        )
    } else {
        return (
            <A11y role="content" description="Search Panel Full, contains both filtering inputs and results. The Full Panel splits into two when the width of the window is larger.">
                <Html ref={fullPanelRef} scale={scale} className="dialog-container top-dialog-container" position={width < 1800 ? topPosition : rightPosition} transform sprite>
                    <form>            
                        {leftPanel}
                        {rightPanel}
                    </form>
                    <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                </Html>
            </A11y>
        )
    }
}

function SearchPanelLeft({
    handleChange,
    currentCategorySearchString,
    currentSubcategorySearchString,
    currentTodoSearchString,
    searchDatesTimes
}) {
    return (
        <>
            <h3 aria-hidden="true">Search Todos</h3>
            <section className="subsection">
                <div>
                    <input type="text" id="search-todos-category-input" onChange={handleChange} value={currentCategorySearchString} />
                    <label htmlFor="search-todos-category-input">Search by Category</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="text" id="search-todos-subcategory-input" onChange={handleChange} value={currentSubcategorySearchString} />
                    <label htmlFor="search-todos-subcategory-input">Search by Subcategory</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="text" id="search-todos-name-input" onChange={handleChange} value={currentTodoSearchString} />
                    <label htmlFor="search-todos-name-input">Search by Todo Item Name</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="checkbox" id="search-todos-specified-input" onChange={handleChange} checked={searchDatesTimes === 'specified'} />
                    <label htmlFor="search-todos-specified-input">Specified Only</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="checkbox" id="search-todos-pattern-input" onChange={handleChange} checked={searchDatesTimes === 'pattern'} />
                    <label htmlFor="search-todos-pattern-input">Patterns Only</label>
                </div>
            </section>
        </>
    )
}

function SearchPanelRight({
    handleDeleteTodo,
    todos,
    setTodos,
    setSelectedTodo,
    setCurrentPanel,
    filteredTodos,
    setCurrentAnimation
}) {
    // limit height of results
    //limit height of todos? yes in times, dates, todos
    return (
        <>
            {
                filteredTodos.length > 0
                ?
                <section className="search-todos-results-container">
                    <h3>Results</h3>
                    <ul className="search-todos-results-todo-list">        
                        {
                            filteredTodos?.map(todo => {
                                return (
                                    <SingleTodo
                                        key={todo.id}
                                        todo={todo}
                                        handleDeleteTodo={handleDeleteTodo}
                                        todos={todos}
                                        setTodos={setTodos}
                                        setSelectedTodo={setSelectedTodo}
                                        setCurrentPanel={setCurrentPanel}
                                        setCurrentAnimation={setCurrentAnimation}
                                    />
                                )
                            })
                        } 
                    </ul>
                </section>
                :
                <section>
                    <h3>No Results</h3>
                </section>
            }
        </>
    )
}