import { Html } from "@react-three/drei";
import { useState } from "react";
import SingleTodo from "./components/SingleTodo";

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

    if (isWide === true) {
        return (
            <>
                <Html scale={scale} className="dialog-container" position={leftPosition} transform sprite>
                    <form>
                        <SearchPanelLeft
                            handleChange={handleChange}
                            currentCategorySearchString={currentCategorySearchString}
                            currentSubcategorySearchString={currentSubcategorySearchString}
                            currentTodoSearchString={currentTodoSearchString}
                            searchDatesTimes={searchDatesTimes}
                        />
                    </form>
                </Html>

                <Html scale={scale} className="dialog-container" position={rightPosition} transform sprite>
                    <form>
                        <SearchPanelRight
                            handleDeleteTodo={handleDeleteTodo}
                            todos={todos}
                            setTodos={setTodos}
                            setSelectedTodo={setSelectedTodo}
                            currentPanel={currentPanel}
                            setCurrentPanel={setCurrentPanel}
                            filteredTodos={filteredTodos}
                        />
                    </form>
                </Html>
            </>
        )
    } else {
        return (
            <Html scale={scale} className="dialog-container" position={width < 1800 ? topPosition : rightPosition} transform sprite>
                <form>            
                    <SearchPanelLeft
                        handleChange={handleChange}
                        currentCategorySearchString={currentCategorySearchString}
                        currentSubcategorySearchString={currentSubcategorySearchString}
                        currentTodoSearchString={currentTodoSearchString}
                        searchDatesTimes={searchDatesTimes}
                    />
                    <SearchPanelRight
                        handleDeleteTodo={handleDeleteTodo}
                        todos={todos}
                        setTodos={setTodos}
                        setSelectedTodo={setSelectedTodo}
                        currentPanel={currentPanel}
                        setCurrentPanel={setCurrentPanel}
                        filteredTodos={filteredTodos}
                    />
                </form>
            </Html>
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
            <h3>Search Todos</h3>
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
    filteredTodos
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