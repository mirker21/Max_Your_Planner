import { useState } from "react";
import TodoSpecifiedReminderFrequencyDisplay from "./TodoSpecifiedReminderFrequencyDisplay";
import TodoPatternReminderFrequencyDisplay from "./TodoPatternReminderFrequencyDisplay";
import SearchTodoEditDeleteTodoButton from "./SearchTodoEditDeleteTodoButton";

export default function SingleSearchTodo({
    todo,
    index,
    handleDeleteTodo,
    todos,
    setTodos,
    setSelectedTodo,
    currentPanel,
    setCurrentPanel,
    setCurrentAnimation,
}) {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    function convertNumSuffix(num) {
        let numberSuffix = '';
        let lastNum = num[num.length - 1];
        switch (lastNum) {
            case '0':
                numberSuffix = 'th';
                break;
            case '1':
                numberSuffix = 'st';
                break;
            case '2':
                numberSuffix = 'nd';
                break;
            case '3':
                numberSuffix = 'rd';
                break;
            case '4':
                numberSuffix = 'th';
                break;
            case '5':
                numberSuffix = 'th';
                break;
            case '6':
                numberSuffix = 'th';
                break;
            case '7':
                numberSuffix = 'th';
                break;
            case '8':
                numberSuffix = 'th';
                break;
            case '9':
                numberSuffix = 'th';
                break;
        }
        return numberSuffix;
    }

    return (
        <li aria-label={"Filtered To-Do Number " + (parseInt(index) + 1)} className="search-todos-single-todo-container" id={todo.todo + todo.id}>
            <SearchTodoEditDeleteTodoButton
                todoId={todo.id}
                index={index}
                setSelectedTodo={setSelectedTodo}
                setCurrentPanel={setCurrentPanel}
                handleDeleteTodo={handleDeleteTodo}
                isDeleteModalVisible={isDeleteModalVisible}
                setIsDeleteModalVisible={setIsDeleteModalVisible}
                setCurrentAnimation={setCurrentAnimation}
            />

            <section className="subsection search-todos-results-todo-category-subcategory-section">
                <p aria-label={"Category: " + todo.category}>Category: {todo.category}</p>
                <p aria-label={"Sub Category: " + todo.subcategory}>Subcategory: {todo.subcategory}</p>
            </section>
            
            <section className="subsection search-todos-results-todos-section">
                <h4 className="todo-header" aria-hidden="true">Todos:</h4>
                <ul className="search-todos-results-todos-container" aria-label="Filtered To-Do List">
                    {
                        todo.checklist.map((item, index) => {
                            return <li aria-label={'List Item Number ' + (parseInt(index) + 1) + ': ' + item.todo} key={todo.id + index}>- {item.todo}</li>
                        })
                    }
                </ul>
            </section>

            {
                todo.reminderFrequency.length > 1 || todo.reminderFrequency[0].hasOwnProperty('date') === true
                ?
                <TodoSpecifiedReminderFrequencyDisplay
                    convertNumSuffix={convertNumSuffix}
                    reminderFrequency={todo.reminderFrequency}
                />
                :
                <TodoPatternReminderFrequencyDisplay
                    convertNumSuffix={convertNumSuffix}
                    reminderFrequency={todo.reminderFrequency}
                />
            }
        </li>
    )
}