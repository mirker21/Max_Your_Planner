import { useState } from "react";
import TodayTodoActivationButton from "./TodayTodoActivationButton";
import TodoSpecifiedReminderFrequencyDisplay from "./TodoSpecifiedReminderFrequencyDisplay";
import TodoPatternReminderFrequencyDisplay from "./TodoPatternReminderFrequencyDisplay";

export default function SingleTodayTodo({
    todo,
    deactivatedTodaysTodos,
    handleDeactivateTodaysTodo,
}) {
    const [isDeactivateModalVisible, setIsDeactivateModalVisible] = useState(false);

    console.log(deactivatedTodaysTodos)

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
        <li className={"todays-todos-single-todo-container" + `${deactivatedTodaysTodos.includes(todo.id) ? ' deactivated' : ''}`} id={todo.id}>
            <TodayTodoActivationButton 
                todoId={todo.id}
                deactivatedTodaysTodos={deactivatedTodaysTodos}
                handleDeactivateTodaysTodo={handleDeactivateTodaysTodo}
                isDeactivateModalVisible={isDeactivateModalVisible}
                setIsDeactivateModalVisible={setIsDeactivateModalVisible}
            />

            <section className="subsection">
                <p>Category: {todo.category}</p>
                <p>Subcategory: {todo.subcategory}</p>
            </section>
            
            <section className="subsection">
                <h4 className="todo-header">Todos:</h4>
                <ul className="search-todos-results-todos-container">
                    {
                        todo.checklist.map((item, index) => {
                            return <li className="reminder-frequency-description" key={todo.id + index}>- {item.todo}</li>
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