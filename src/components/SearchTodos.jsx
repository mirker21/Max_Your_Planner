import { useState } from "react"
import SingleTodo from "./SingleTodo"

export default function SearchTodos({
    todos,
    setTodos,
    setCurrentPanel,
    selectedTodo,
    setSelectedTodo
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
                setSearchIsPattern('specified')
            } else {
                setSearchIsPattern('')
            }
        } else if (event.target.id === 'search-todos-pattern-input') {
            if (searchDatesTimes === 'pattern') {
                setSearchIsPattern('pattern')
            } else {
                setSearchIsPattern('')
            }
        }
    }

    console.log('SEARCH TODOS!')

    function handleDeleteTodo(id) {
        let newTodos = [...todos];

        newTodos = newTodos.filter(todo => todo.id !== id)
        setTodos([...newTodos])
    }

    // const newTodo = {
    //     id: generateUUID(),
    //     category: category,
    //     subcategory: subcategory,
    //     reminderFrequency: [...datesTimes],
    //     checklist: [...checklist]
    // };

    // SPECIFIED:
    // const newDateTime = {
    //     id: generateUUID(),
    //     date: date,
    //     times: times.length > 0 ? [...times] : 'All-Day'
    // };

    // PATTERN:
    // [
    //     {
    //         times: times.length > 0 ? [...times] : 'All-Day',
    //         day: {
    //             days: [...days],
    //             dayEquation: dayEquation,
    //             isEveryDayOfWeekEachMonth: isEveryDayOfWeekEachMonth,
    //             everyNthDayOfWeekEachMonth: everyNthDayOfWeekEachMonth,
    //         },
    //         month: {
    //             months: [...months],
    //             monthEquation: monthEquation,
    //             isEveryMonthOfYear: isEveryMonthOfYear
    //         },
    //         year: {
    //             years: [...years],
    //             yearEquation: yearEquation,
    //             isEveryYear: isEveryYear,
    //             yearRange: yearRange
    //         }
    //     }
    // ]

    let filteredTodos = [...todos];

    if (currentCategorySearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            todo.category === currentCategorySearchString;
        })
    } 
    
    if (currentSubcategorySearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            todo.subcategory === currentSubcategorySearchString;
        })
    } 
    
    if (currentTodoSearchString.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            todo.checklist.some(item => item === currentSubcategorySearchString) === true;
        })
    }
    
    if (searchDatesTimes === 'specified') {
        filteredTodos = filteredTodos.filter(todo => {
            todo.reminderFrequency.length > 1;
        })
    } else if (searchDatesTimes === 'pattern') {
        filteredTodos = filteredTodos.filter(todo => {
            todo.reminderFrequency.length === 1;
        })
    }

    return (
        <form>
            <section>
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
            </section>

            <section className="subsection">
                <ul>        
                    {
                        filteredTodos?.map((todo, index) => {
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
        </form>
    )
}

export function SearchPanelLeft({
    handleChange,
    currentCategorySearchString,
    currentSubcategorySearchString,
    currentTodoSearchString,
    searchDatesTimes
}) {
    return (
        <section>
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
        </section>
    )
}

export function SearchPanelRight({
    handleDeleteTodo,
    todos,
    setTodos,
    setSelectedTodo,
    setCurrentPanel,
    filteredTodos
}) {
    return (
        <section className="subsection">
            <ul>        
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
    )
}