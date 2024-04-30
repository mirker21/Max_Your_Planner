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
            } else {
                setIsEveryDayOfWeekEachMonth(false)
            }
            setDays([])
            newDayEquation.first = event.target.value;
            setDayEquation(newDayEquation);
            setEveryNthDayOfWeekEachMonth('')
        } else if (event.target.id === 'day-of-week-equation-second-num') {
            let newDayEquation = {...dayEquation};
            if (event.target.value === '' && dayEquation.first === '') {
                setIsEveryDayOfWeekEachMonth(true)
            } else {
                setIsEveryDayOfWeekEachMonth(false)
            }
            setDays([])
            newDayEquation.second = event.target.value;
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
            if (event.target.value === '') {
                setIsEveryDayOfWeekEachMonth(true)
            } else {
                setIsEveryDayOfWeekEachMonth(false)
            }
            
            setDayEquation(
                {
                    first: '',
                    second: ''
                }
            )
            setEveryNthDayOfWeekEachMonth(event.target.value)
        }
    }

    return (
        <>
            {
                <>
                    <hr />

                    <h3>Days of Week</h3>

                    <span>* If nothing is selected in the days of week section, the default will be every day. *</span>
                    
                    <section className="subsection">
                        <label id="day-of-week-equation-label">
                            <p>Every{' '}
                                <input 
                                    type="number" 
                                    id="day-of-week-equation-first-num" 
                                    min="1" 
                                    onChange={handleChangeDayPattern} 
                                    value={dayEquation.first}
                                />
                                <i> n </i>
                                + <input 
                                    type="number" 
                                    id="day-of-week-equation-second-num" 
                                    min="0" 
                                    onChange={handleChangeDayPattern} 
                                    value={dayEquation.second}
                                />
                            {' '}days
                            </p>
                        </label>

                        <p>ie. </p>
                    </section>

                    <section className="subsection">
                        <div>
                            <input 
                                type="checkbox" 
                                name="day-of-week-each-month-checked" 
                                id="day-of-week-each-month-checked" 
                                onChange={handleChangeDayPattern} 
                                checked={isEveryDayOfWeekEachMonth}
                            />

                            <label 
                                htmlFor="day-of-week-each-month-checked"
                            >
                                Every {days.length > 0 ? days.join(', ') : 'day of week'} of each month
                            </label>
                        </div>
                    </section>

                    <section className="subsection">
                        <div>
                            <input 
                                type="number" 
                                id="nth-day-of-week-each-month" 
                                name="nth-day-of-week-each-month" 
                                min="1" 
                                max="5" 
                                onChange={handleChangeDayPattern} 
                                value={everyNthDayOfWeekEachMonth} 
                                disabled={days.length === 0}
                            />
                            <label 
                            htmlFor="nth-day-of-week-each-month">
                                Every{' '}
                                {everyNthDayOfWeekEachMonth.length > 0 ? everyNthDayOfWeekEachMonth : 'n'}
                                {numberSuffix}{' '} 
                                {days.length > 0 ? days.join(', ') : 'day of week'} 
                                {' '} of each month
                            </label>  
                        </div>
                    </section>

                    <article>
                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Sunday" 
                                value="Sunday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Sunday')}
                            />
                            <label className="black-text-label" htmlFor="Sunday">Sunday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Monday" 
                                value="Monday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Monday')}
                            />
                            <label className="black-text-label" htmlFor="Monday">Monday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Tuesday" 
                                value="Tuesday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Tuesday')}
                            />
                            <label className="black-text-label" htmlFor="Tuesday">Tuseday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Wednesday" 
                                value="Wednesday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Wednesday')}
                            />
                            <label className="black-text-label" htmlFor="Wednesday">Wednesday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Thursday" 
                                value="Thursday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Thursday')}
                            />
                            <label className="black-text-label" htmlFor="Thursday">Thursday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Friday" 
                                value="Friday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Friday')}
                            />
                            <label className="black-text-label" htmlFor="Friday">Friday</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="days-of-week" 
                                id="Saturday" 
                                value="Saturday" 
                                onChange={handleChangeDay} 
                                checked={days.includes('Saturday')}
                            />
                            <label className="black-text-label" htmlFor="Saturday">Saturday</label>
                        </div>
                    </article>
                </>
            }
        </>
    )
}