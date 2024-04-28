import { useState } from "react";

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
            <section className="list-item"> 
                <button type="button" className="single-todo-button" onClick={() => setIsDeactivateModalVisible(!isDeactivateModalVisible)}>
                    {
                        deactivatedTodaysTodos.includes(todo.id)
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    }

                    <span className="button-text">{deactivatedTodaysTodos.includes(todo.id) ? 'Activate' : 'Deactivate'} Notification for Today</span>
                </button>

                {
                    isDeactivateModalVisible === true
                    ?
                    <section className="subsection">
                        <button type="button" onClick={() => (handleDeactivateTodaysTodo(todo.id), setIsDeactivateModalVisible(!isDeactivateModalVisible))}>Yes</button>
                        <button type="button" onClick={() => setIsDeactivateModalVisible(!isDeactivateModalVisible)}>No</button>
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
                <section className="subsection search-todos-results-todo-reminder-frequency-section">
                    <h4 className="todo-header">Date and Time:</h4>

                    <section className="search-todos-results-date-time-container">
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
                </section>
                :
                <section className="subsection">
                    <h4 className="todo-header">Date and Time Pattern:</h4>
                    
                    <section className="search-todos-results-date-time-container">

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
                </section>
            }
        </li>
    )
}