import { useState } from "react";
import TodoSpecifiedReminderFrequencyDisplay from "./TodoSpecifiedReminderFrequencyDisplay";
import TodoPatternReminderFrequencyDisplay from "./TodoPatternReminderFrequencyDisplay";
import SearchTodoDeleteTodoButton from "./SearchTodoDeleteTodoButton";

export default function SingleTodo({
    todo,
    handleDeleteTodo,
    todos,
    setTodos,
    setSelectedTodo,
    currentPanel,
    setCurrentPanel
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
        <li className="search-todos-single-todo-container" id={todo.todo + todo.id}>
            <SearchTodoDeleteTodoButton
                todoId={todo.id}
                setSelectedTodo={setSelectedTodo}
                setCurrentPanel={setCurrentPanel}
                handleDeleteTodo={handleDeleteTodo}
                isDeleteModalVisible={isDeleteModalVisible}
                setIsDeleteModalVisible={setIsDeleteModalVisible}
            />

            <section className="subsection search-todos-results-todo-category-subcategory-section">
                <p>Category: {todo.category}</p>
                <p>Subcategory: {todo.subcategory}</p>
            </section>
            
            <section className="subsection search-todos-results-todos-section">
                <h4 className="todo-header">Todos:</h4>
                <ul className="search-todos-results-todos-container">
                    {
                        todo.checklist.map((item, index) => {
                            return <li key={todo.id + index}>- {item.todo}</li>
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