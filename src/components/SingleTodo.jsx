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
        <li className="single-todo-container" id={todo.todo + todo.id}>
            <section className="list-item">  
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
            </section>

            <section className="subsection">
                <p>Category: {todo.category}</p>
                <p>Subcategory: {todo.subcategory}</p>
            </section>
            
            <section className="subsection">
                <h4 className="todo-header">Todos:</h4>
                <ul>
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
                <section className="subsection reminder-frequency-description">
                    <h4 className="todo-header">Date and Time:</h4>
                    {
                        todo.reminderFrequency.map((dateTime, dateIndex) => {
                            let dateString = String(new Date(dateTime.date).toUTCString()).replace(',', '').split(' ')
                            let dayWord = dateString[0];
                            let dayNum = dateString[1];
                            let month = dateString[2];
                            let year = dateString[3];

                            let displayedDate = dayWord + ', ' + month + ' ' + dayNum + ', ' + year;
                            return (
                                <section className="subsection" key={dateTime + dateIndex}>
                                    <p>Date: {displayedDate}</p>
                                    {
                                        dateTime.times.map((time, timeIndex) => {
                                            let meridian = 'AM';
                                            let [hour, minute] = time.split(':');

                                            if (hour <= 11) {
                                                if (hour[0] === '0') {
                                                    hour = hour.slice(1,);
                                                }
                                            } else {
                                                if (hour > 12) {
                                                    hour = hour - 12;
                                                }
                                                meridian = 'PM';
                                            }

                                            let displayedTime = hour + ':' + minute + ' ' + meridian;
                                            return <p key={time + timeIndex}>Time: {displayedTime}</p>
                                        })
                                    }
                                </section>
                            )
                        })
                    }
                </section>
                :
                <section className="subsection">
                    <h4 className="todo-header">Date and Time Pattern:</h4>
                    
                    {
                        todo.reminderFrequency[0].times === "All-Day"
                        ?
                        <p>All Day</p>
                        :
                        <p> 
                            {                        
                                todo.reminderFrequency[0].times.map((time, index) => {
                                    let meridian = 'AM';
                                    let [hour, minute] = time.split(':');

                                    if (hour <= 11) {
                                        if (hour[0] === '0') {
                                            hour = hour.slice(1,);
                                        }
                                    } else {
                                        if (hour > 12) {
                                            hour = hour - 12;
                                        }
                                        meridian = 'PM';
                                    }

                                    let addComma = todo.reminderFrequency[0].times.length > 1 ? ', ' : '';
                                    let displayedTime = hour + ':' + minute + ' ' + meridian + addComma;
                                    
                                    return displayedTime;
                                })
                            }
                        </p>
                        
                    }

                    {
                        todo.reminderFrequency[0].day.days?.length > 0
                        ?
                        <p>Days: {todo.reminderFrequency[0].day.days?.join(', ')}</p> 
                        :
                        <></>
                    }
                                
                    {
                        todo.reminderFrequency[0].day.isEveryDayOfWeekEachMonth == true
                        ?
                        <p>Every {todo.reminderFrequency[0].day.days.join(', ').length > 0 ? todo.reminderFrequency[0].day.days.join(', ') : 'Day Of Week'}</p>
                        :
                        <></>
                    }
                    {
                        todo.reminderFrequency[0].hasOwnProperty('date') === false && todo.reminderFrequency[0].day.everyNthDayOfWeekEachMonth.length > 0
                        ?
                        <p>
                            Every{' '}
                            {
                                todo.reminderFrequency[0].day.everyNthDayOfWeekEachMonth 
                                + 
                                convertNumSuffix(todo.reminderFrequency[0].day.everyNthDayOfWeekEachMonth)
                            }
                            {todo.reminderFrequency[0].day.days.join(', ').length > 0 ? todo.reminderFrequency[0].day.days.join(', ') : 'Day of Week'}{' '}
                            Per Month
                        </p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].day.dayEquation.first.length > 0 && todo.reminderFrequency[0].day.dayEquation.second.length > 0
                        ?
                        <p>{todo.reminderFrequency[0].day.dayEquation.first}n + {todo.reminderFrequency[0].day.dayEquation.second}</p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].month.months.length > 0
                        ?
                        <p>Months: {todo.reminderFrequency[0].month.months.join(', ')}</p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].month.isEveryMonthOfYear == true
                        ?
                        <p>Every {todo.reminderFrequency[0].month.months.join(', ').length > 0 ? todo.reminderFrequency[0].month.months.join(', ') : 'Month Of Year'}</p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].month.monthEquation.first.length > 0 && todo.reminderFrequency[0].month.monthEquation.second.length > 0
                        ?
                        <p>{todo.reminderFrequency[0].month.monthEquation.first}n + {todo.reminderFrequency[0].month.monthEquation.second}</p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].year.years.length > 0
                        ?
                        <p>Years: {todo.reminderFrequency[0].year.years.join(', ')}</p>
                        :
                        <></>
                    } 
                        
                    {
                        todo.reminderFrequency[0].year.isEveryYear == true
                        ?
                        <p>Every Year</p>
                        :
                        <></>
                    }

                    {
                        todo.reminderFrequency[0].year.yearEquation.first.length > 0 && todo.reminderFrequency[0].year.yearEquation.second.length > 0
                        ?
                        <p>{todo.reminderFrequency[0].year.yearEquation.first}n + {todo.reminderFrequency[0].year.yearEquation.second}</p>
                        :
                        <></>
                    }
                </section>
            }
        </li>
    )
}