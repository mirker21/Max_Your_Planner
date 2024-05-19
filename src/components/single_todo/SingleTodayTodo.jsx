import { useState } from "react";
import TodayTodoActivationButton from "./TodayTodoActivationButton";
import TodoSpecifiedReminderFrequencyDisplay from "./TodoSpecifiedReminderFrequencyDisplay";
import TodoPatternReminderFrequencyDisplay from "./TodoPatternReminderFrequencyDisplay";

export default function SingleTodayTodo({
    todo,
    index,
    deactivatedTodaysTodos,
    handleDeactivateTodaysTodo,
}) {
    const [isDeactivateModalVisible, setIsDeactivateModalVisible] = useState(false);

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
        <li aria-label={"Today's To-Do Number " + (parseInt(index) + 1)} className={"todays-todos-single-todo-container" + `${deactivatedTodaysTodos.includes(todo.id) ? ' deactivated' : ''}`} id={todo.id}>
            <TodayTodoActivationButton 
                todoId={todo.id}
                index={index}
                deactivatedTodaysTodos={deactivatedTodaysTodos}
                handleDeactivateTodaysTodo={handleDeactivateTodaysTodo}
                isDeactivateModalVisible={isDeactivateModalVisible}
                setIsDeactivateModalVisible={setIsDeactivateModalVisible}
            />

            <section className="subsection">
                <p aria-label={"Category: " + todo.category}>Category: {todo.category}</p>
                <p aria-label={"Sub Category: " + todo.subcategory}>Subcategory: {todo.subcategory}</p>
            </section>
            
            <section className="subsection">
                <h4 className="todo-header" aria-hidden="true">Todos:</h4>
                <ul className="search-todos-results-todos-container" role="list" aria-label="Today's To-Do List">
                    {
                        todo.checklist.map((item, index) => {
                            return <li aria-label={'List Item Number ' + (parseInt(index) + 1) + ': ' + item.todo} className="reminder-frequency-description" key={todo.id + index}>- {item.todo}</li>
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