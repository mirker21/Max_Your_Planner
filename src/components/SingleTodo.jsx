import { useState } from "react";

export default function SingleTodo({
    todo,
    handleDeleteTodo,
    todos,
    setTodos,
    setSelectedTodo,
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
        <li className="list-item" id={todo.todo + todo.id}>
            <button type="button" onClick={removeTodo} id={todo.id}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>

            <button type="button" className="interface-button" onClick={() => (setCurrentPanel('edit-todo'), setSelectedTodo(todo.id))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

                <span className="button-text">Edit Todo</span>
            </button>

            <button type="button" className="interface-button" onClick={() => setIsDeleteModalVisible(!isDeleteModalVisible)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <span className="button-text">Delete Todo</span>
            </button>

            {
                isDeleteModalVisible === true
                ?
                <section className="subsection">
                    <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Yes</button>
                    <button type="button" onClick={() => setIsDeleteModalVisible(!isDeleteModalVisible)}>No</button>
                </section>
                :
                <></>
                
            }

            <p>{todo.category}</p>
            <p>{todo.subcategory}</p>
            
            <ul>
                {
                    todo.checklist.map((item, index) => {
                        <li key={todo.id + item + index}>{item}</li>
                    })
                }
            </ul>

            {
                todo.reminderFrequency.length > 1
                ?
                <section>
                    {
                        todo.reminderFrequency.map((dateTime, dateIndex) => {
                            return (
                                <section className="subsection" key={dateTime + dateIndex}>
                                    <p>{dateTime.date}</p>
                                    {
                                        todo.reminderFrequency.times.map((time, timeIndex) => {
                                            return <p key={time + timeIndex}>{time}</p>
                                        })
                                    }
                                </section>
                            )
                        })
                    }
                </section>
                :
                <section>
                    <section className="subsection">
                        {
                            todo.reminderFrequency.day.days.length > 0
                            ?
                            <p>Days: {todo.reminderFrequency.day.days.join(', ')}</p> 
                            :
                            <></>
                        }
                                   
                                {
                                    todo.reminderFrequency.day.isEveryDayOfWeekEachMonth == true
                                    ?
                                    <p>Every {todo.reminderFrequency.day.days.join(', ').length > 0 ? todo.reminderFrequency.day.days.join(', ') : 'Day'} Of Week Per Month</p>
                                    :
                                    <></>
                                }
                        {
                            todo.reminderFrequency.day.everyNthDayOfWeekEachMonth.length > 0
                            ?
                            <p>
                                Every{' '}
                                {
                                    todo.reminderFrequency.day.everyNthDayOfWeekEachMonth 
                                    + 
                                    convertNumSuffix(todo.reminderFrequency.day.everyNthDayOfWeekEachMonth)
                                }
                                {todo.reminderFrequency.day.days.join(', ').length > 0 ? todo.reminderFrequency.day.days.join(', ') : 'Day of Week'}{' '}
                                Per Month
                            </p>
                            :
                            <></>
                        }

                        {
                            todo.reminderFrequency.day.dayEquation.first.length > 0 && todo.reminderFrequency.day.dayEquation.second.length > 0
                            ?
                            <p>{todo.reminderFrequency.day.dayEquation.first}n + {todo.reminderFrequency.day.dayEquation.second}</p>
                            :
                            <></>
                        }
                    </section>

                    <section className="subsection">
                        {
                            todo.reminderFrequency.month.months.length > 0
                            ?
                            <p>Months: {todo.reminderFrequency.month.months.join(', ')}</p>
                            :
                            <></>
                        }

                        {
                            todo.reminderFrequency.month.isEveryMonthOfYear == true
                            ?
                            <p>Every {todo.reminderFrequency.month.months.join(', ').length > 0 ? todo.reminderFrequency.month.months.join(', ') : 'Month'} Of Year</p>
                            :
                            <></>
                        }

                        {
                            todo.reminderFrequency.month.monthEquation.first.length > 0 && todo.reminderFrequency.month.monthEquation.second.length > 0
                            ?
                            <p>{todo.reminderFrequency.month.monthEquation.first}n + {todo.reminderFrequency.month.monthEquation.second}</p>
                            :
                            <></>
                        }
                    </section>

                    <section className="subsection">
                        {
                            todo.reminderFrequency.year.years.length > 0
                            ?
                            <p>Years: {todo.reminderFrequency.year.years.join(', ')}</p>
                            :
                            <></>
                        } 
                            
                        {
                            todo.reminderFrequency.year.isEveryYear == true
                            ?
                            <p>Every Year</p>
                            :
                            <></>
                        }

                        {
                            todo.reminderFrequency.year.yearEquation.start.length > 0 && todo.reminderFrequency.year.yearEquation.end.length > 0
                            ?
                            <p>{todo.reminderFrequency.year.yearEquation.start}n + {todo.reminderFrequency.year.yearEquation.end}</p>
                            :
                            <></>
                        }
                    </section>
                </section>
            }
        </li>
    )
}