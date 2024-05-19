export default function TodoPatternReminderFrequencyDisplay({convertNumSuffix, reminderFrequency}) {
    // Provide better explanations for the layout here.

    let displayedTimes = [];

    if (reminderFrequency[0].times !== "All-Day") {
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
            
            displayedTimes.push(displayedTime);
        })
    }

    return (
        <section className="subsection">
            <h4 className="todo-header" aria-label="Today's To-Do Reminder Frequency: Pattern">Date and Time Pattern:</h4>
            
            <section className="search-todos-results-date-time-container">

                {
                    reminderFrequency[0].times === "All-Day"
                    ?
                    <p aria-label="Time set to All-Day">All Day</p>
                    :
                    <p aria-label={"Time set to " + (displayedTimes.join(', '))} >{displayedTimes.join(', ')}</p>
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
                    <p 
                        aria-label={'Day Pattern set to ' + 'Every ' + (reminderFrequency[0].day.days.join(', ').length > 0 ? reminderFrequency[0].day.days.join(', ') : 'Day Of Week')}
                    >
                        Every {reminderFrequency[0].day.days.join(', ').length > 0 ? reminderFrequency[0].day.days.join(', ') : 'Day Of Week'}
                    </p>
                    :
                    <></>
                }
                {
                    reminderFrequency[0].hasOwnProperty('date') === false && reminderFrequency[0].day.everyNthDayOfWeekEachMonth.length > 0
                    ?
                    <p
                        aria-label={
                            'Day Pattern set to '
                            +
                            'Every ' +
                            (
                                reminderFrequency[0].day.everyNthDayOfWeekEachMonth 
                                + 
                                convertNumSuffix(reminderFrequency[0].day.everyNthDayOfWeekEachMonth)
                            )
                            +
                            (
                                reminderFrequency[0].day.days.join(', ').length > 0 
                                ? 
                                reminderFrequency[0].day.days.join(', ') 
                                : 
                                'Day of Week'
                            )
                            + ' Per Month'
                        }
                    >
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
                    <p 
                        aria-label={'Day Equation set to ' +
                        (reminderFrequency[0].day.dayEquation.first) 
                        + 'n +' 
                        + (reminderFrequency[0].day.dayEquation.second)}
                    >
                        {reminderFrequency[0].day.dayEquation.first}n + {reminderFrequency[0].day.dayEquation.second}
                    </p>
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
                    <p
                        aria-label={'Month Pattern set to every ' + (reminderFrequency[0].month.months.join(', ').length > 0 ? reminderFrequency[0].month.months.join(', ') : 'Month Of Year')}
                    >Every {reminderFrequency[0].month.months.join(', ').length > 0 ? reminderFrequency[0].month.months.join(', ') : 'Month Of Year'}</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].month.monthEquation.first.length > 0 && reminderFrequency[0].month.monthEquation.second.length > 0
                    ?
                    <p
                        aria-label={'Month Equation set to ' + (reminderFrequency[0].month.monthEquation.first) + 'n + ' + (reminderFrequency[0].month.monthEquation.second)}
                    >{reminderFrequency[0].month.monthEquation.first}n + {reminderFrequency[0].month.monthEquation.second}</p>
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
                    <p
                        aria-label="Year Pattern set to Every Year"
                    >Every Year</p>
                    :
                    <></>
                }

                {
                    reminderFrequency[0].year.yearEquation.first.length > 0 && reminderFrequency[0].year.yearEquation.second.length > 0
                    ?
                    <p
                        aria-label={"Year Equation set to " + (reminderFrequency[0].year.yearEquation.first) + 'n + ' + (reminderFrequency[0].year.yearEquation.second)}
                    >{reminderFrequency[0].year.yearEquation.first}n + {reminderFrequency[0].year.yearEquation.second}</p>
                    :
                    <></>
                }
            </section>
        </section>
    )
}