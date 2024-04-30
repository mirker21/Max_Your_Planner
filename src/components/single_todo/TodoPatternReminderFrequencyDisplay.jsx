export default function TodoPatternReminderFrequencyDisplay({convertNumSuffix, reminderFrequency}) {
    // Provide better explanations for the layout here.

    return (
        <section className="subsection">
            <h4 className="todo-header">Date and Time Pattern:</h4>
            
            <section className="search-todos-results-date-time-container">

                {
                    reminderFrequency[0].times === "All-Day"
                    ?
                    <p>All Day</p>
                    :
                    <p> 
                        {                        
                            reminderFrequency[0].times.map((time, index) => {
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

                                let addComma = reminderFrequency[0].times.length > 1 ? ', ' : '';
                                let displayedTime = hour + ':' + minute + ' ' + meridian + addComma;
                                
                                return displayedTime;
                            })
                        }
                    </p>
                    
                }

                {
                    reminderFrequency[0].day.days?.length > 0
                    ?
                    <p>Days: {reminderFrequency[0].day.days?.join(', ')}</p> 
                    :
                    <></>
                }
                            
                {
                    reminderFrequency[0].day.isEveryDayOfWeekEachMonth == true
                    ?
                    <p>Every {reminderFrequency[0].day.days.join(', ').length > 0 ? reminderFrequency[0].day.days.join(', ') : 'Day Of Week'}</p>
                    :
                    <></>
                }
                {
                    reminderFrequency[0].hasOwnProperty('date') === false && reminderFrequency[0].day.everyNthDayOfWeekEachMonth.length > 0
                    ?
                    <p>
                        Every{' '}
                        {
                            reminderFrequency[0].day.everyNthDayOfWeekEachMonth 
                            + 
                            convertNumSuffix(reminderFrequency[0].day.everyNthDayOfWeekEachMonth)
                        }
                        {reminderFrequency[0].day.days.join(', ').length > 0 ? reminderFrequency[0].day.days.join(', ') : 'Day of Week'}{' '}
                        Per Month
                    </p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].day.dayEquation.first.length > 0 && reminderFrequency[0].day.dayEquation.second.length > 0
                    ?
                    <p>{reminderFrequency[0].day.dayEquation.first}n + {reminderFrequency[0].day.dayEquation.second}</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].month.months.length > 0
                    ?
                    <p>Months: {reminderFrequency[0].month.months.join(', ')}</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].month.isEveryMonthOfYear == true
                    ?
                    <p>Every {reminderFrequency[0].month.months.join(', ').length > 0 ? reminderFrequency[0].month.months.join(', ') : 'Month Of Year'}</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].month.monthEquation.first.length > 0 && reminderFrequency[0].month.monthEquation.second.length > 0
                    ?
                    <p>{reminderFrequency[0].month.monthEquation.first}n + {reminderFrequency[0].month.monthEquation.second}</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].year.years.length > 0
                    ?
                    <p>Years: {reminderFrequency[0].year.years.join(', ')}</p>
                    :
                    <></>
                } 
                    
                {
                    reminderFrequency[0].year.isEveryYear == true
                    ?
                    <p>Every Year</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].year.yearEquation.first.length > 0 && reminderFrequency[0].year.yearEquation.second.length > 0
                    ?
                    <p>{reminderFrequency[0].year.yearEquation.first}n + {reminderFrequency[0].year.yearEquation.second}</p>
                    :
                    <></>
                }
            </section>
        </section>
    )
}