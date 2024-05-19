export default function FormReminderFrequencyPatternDays({
    days,
    setDays,
    dayEquation,
    setDayEquation,
    isEveryDayOfWeekEachMonth,
    setIsEveryDayOfWeekEachMonth,
    everyNthDayOfWeekEachMonth,
    setEveryNthDayOfWeekEachMonth,
    numberSuffix
}) {
    function handleChangeDay(event) {
        let newDays = [...days];
        if (newDays.includes(event.target.value)) {
            newDays = newDays.filter(day => day !== event.target.value);
        } else {
            newDays.push(event.target.value);
        }
        if (newDays.length === 0) {
            setIsEveryDayOfWeekEachMonth(true)
            setEveryNthDayOfWeekEachMonth('')
        }
        setDays([...newDays]);
        setDayEquation(
            {
                first: '',
                second: ''
            }
        )
    }

    function handleChangeDayPattern(event) {
        if (event.target.id === 'day-of-week-equation-first-num') {
            let newDayEquation = {...dayEquation};
            if (event.target.value === '' && dayEquation.second === '') {
                setIsEveryDayOfWeekEachMonth(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryDayOfWeekEachMonth(false)
                setDays([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newDayEquation.first = event.target.value;
            }

            setDayEquation(newDayEquation);
            setEveryNthDayOfWeekEachMonth('')
        } else if (event.target.id === 'day-of-week-equation-second-num') {
            let newDayEquation = {...dayEquation};
            if (event.target.value === '' && dayEquation.first === '') {
                setIsEveryDayOfWeekEachMonth(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryDayOfWeekEachMonth(false)
                setDays([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newDayEquation.second = event.target.value;
            }

            setDayEquation(newDayEquation);
            setEveryNthDayOfWeekEachMonth('')
        } else if (event.target.id === 'day-of-week-each-month-checked') {
            if (isEveryDayOfWeekEachMonth === false) {
                setIsEveryDayOfWeekEachMonth(true)
                setDayEquation(
                    {
                        first: '',
                        second: ''
                    }
                )
                setEveryNthDayOfWeekEachMonth('')
            }
        } else if (event.target.id === 'nth-day-of-week-each-month') {
            if (event.target.value === '' || event.target.value === ' ') {
                setIsEveryDayOfWeekEachMonth(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryDayOfWeekEachMonth(false)
            }
            
            setDayEquation(
                {
                    first: '',
                    second: ''
                }
            )

            if ((parseInt(event.target.value) < 6 && parseInt(event.target.value) > 0 && event.target.value !== ' ') || event.target.value === '') {
                setEveryNthDayOfWeekEachMonth(event.target.value)
            }
        }
    }

    // Huge thanks to MagentaA11y for explaining why text inputs are better for accessibility than number inputs https://www.magentaa11y.com/checklist-web/number-input/

    return (
        <>
            {
                <>
                    <hr aria-hidden="true" />

                    <h3 
                        aria-label={
                            'Pattern Reminder Frequency: Days of Week Section.'
                            +
                            ' Here, you can customize the days of week pattern for the reminder frequency,'
                            +
                            ' by adding a linear equation, or only'
                            +
                            ' having this notification happen on specific days of the week,'
                            +
                            ' or only having this notification happen on, for example, the first Tuesday of every month,'
                        }
                    >
                        Days of Week
                    </h3>

                    <span aria-label="Note: If nothing is selected in the days of week section, the default will be every day.">* If nothing is selected in the days of week section, the default will be every day. *</span>
                    
                    <section className="subsection">
                        <label id="day-of-week-equation-label">
                            <span aria-hidden="true">Every{' '}</span>
                            <input 
                                aria-label="Days of Week Equation Pattern, First Number input to the equation First Number × n + Second Number"
                                type="text" 
                                id="day-of-week-equation-first-num" 
                                minLength={0}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                onChange={handleChangeDayPattern}
                                value={dayEquation.first}
                            />
                            <i aria-hidden="true"> n + </i>
                            <input 
                                aria-label="Days of Week Equation Pattern, Second Number input to the equation First Number × n + Second Number"
                                type="text" 
                                id="day-of-week-equation-second-num" 
                                minLength={0}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                onChange={handleChangeDayPattern}
                                value={dayEquation.second}
                            />
                            <span aria-hidden="true">{' '}days</span>
                        </label>

                        {   
                            dayEquation.first !== '' || dayEquation.second !== ''
                            ?
                            <p 
                                aria-label={
                                    'Current Day Equation Set To: ' 
                                    + 
                                    ((dayEquation.first === '1' || dayEquation.first === '') ? '' : dayEquation.first + 'n + ') 
                                    + 
                                    (dayEquation.second === '' ? '0' : dayEquation.second)
                                }
                            >
                                Day Equation: {(dayEquation.first === '1' || dayEquation.first === '') ? '' : dayEquation.first}n + {dayEquation.second === '' ? '0' : dayEquation.second}
                            </p>
                            :
                            <></>
                        }
                    </section>

                    <section className="subsection">
                        <div>
                            <input 
                                aria-label={'Is set to every ' + (days.length > 0 ? days.join(', ') : 'day of week or only the checked days') + ' of each month'}
                                type="checkbox" 
                                name="day-of-week-each-month-checked" 
                                id="day-of-week-each-month-checked" 
                                onChange={handleChangeDayPattern} 
                                checked={isEveryDayOfWeekEachMonth}
                            />

                            <label 
                                aria-hidden="true"
                                htmlFor="day-of-week-each-month-checked"
                            >
                                Every {days.length > 0 ? days.join(', ') : 'day of week'} of each month
                            </label>
                        </div>
                    </section>

                    <section className="subsection">
                        <div>
                            <input 
                                aria-label={days.length === 0 ? 'Days of week must be checked below in order to edit this input' : 'Number entered must be 1 through 5. Currently set to every ' + (everyNthDayOfWeekEachMonth !== '' ? everyNthDayOfWeekEachMonth + numberSuffix + ' ' : 'nth ') + (days.length > 0 ? days.join(', ') : 'day of week') + ' of each month'}
                                aria-disabled={days.length === 0}
                                disabled={days.length === 0}
                                type="text" 
                                id="nth-day-of-week-each-month" 
                                name="nth-day-of-week-each-month" 
                                pattern="[1-5]{0, 1}"
                                minLength={0}
                                maxLength={1}
                                onChange={handleChangeDayPattern} 
                                value={everyNthDayOfWeekEachMonth} 
                            />
                            <label 
                                aria-hidden="true"
                                htmlFor="nth-day-of-week-each-month"
                            >
                                Every{' '}
                                {everyNthDayOfWeekEachMonth.length > 0 ? everyNthDayOfWeekEachMonth : 'n'}
                                {numberSuffix}{' '} 
                                {days.length > 0 ? days.join(', ') : 'day of week'} 
                                {' '} of each month
                            </label>  
                        </div>
                    </section>

                    <ul aria-label="Days of Week Checkboxes">
                        <li>
                            <input 
                                aria-label="Check this input for Sunday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Sunday" 
                                value="Sunday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Sunday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Sunday">Sunday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Monday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Monday" 
                                value="Monday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Monday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Monday">Monday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Tuseday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Tuesday" 
                                value="Tuesday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Tuesday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Tuesday">Tuseday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Wednesday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Wednesday" 
                                value="Wednesday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Wednesday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Wednesday">Wednesday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Thursday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Thursday" 
                                value="Thursday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Thursday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Thursday">Thursday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Friday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Friday" 
                                value="Friday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Friday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Friday">Friday</label>
                        </li>

                        <li>
                            <input 
                                aria-label="Check this input for Saturday"
                                type="checkbox" 
                                name="days-of-week" 
                                id="Saturday" 
                                value="Saturday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Saturday')}
                            />
                            <label aria-hidden="true" className="black-text-label" htmlFor="Saturday">Saturday</label>
                        </li>
                    </ul>
                </>
            }
        </>
    )
}