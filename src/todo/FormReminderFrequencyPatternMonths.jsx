export default function FormReminderFrequencyPatternMonths({
    days,
    dayEquation,
    isEveryDayOfWeekEachMonth,
    months,
    setMonths,
    monthEquation,
    setMonthEquation,
    isEveryMonthOfYear,
    setIsEveryMonthOfYear,
}) {
    function handleChangeMonth(event) {
        let newMonths = [...months];
        if (newMonths.includes(event.target.value)) {
            newMonths = newMonths.filter(month => month !== event.target.value);
        } else {
            newMonths.push(event.target.value);
        }
        if (newMonths.length === 0) {
            setIsEveryMonthOfYear(true)
        }
        setMonths([...newMonths]);
        setMonthEquation(
            {
                first: '',
                second: ''
            }
        )
    }

    function handleChangeMonthPattern(event) {
        if (event.target.id === 'month-equation-first-num') {
            let newMonthEquation = {...monthEquation};
            if (event.target.value === '' && monthEquation.second === '') {
                setIsEveryMonthOfYear(true)
            } else {
                setIsEveryMonthOfYear(false)
            }
            setMonths([])
            newMonthEquation.first = event.target.value;
            setMonthEquation(newMonthEquation);
        } else if (event.target.id === 'month-equation-second-num') {
            let newMonthEquation = {...monthEquation};
            if (event.target.value === '' && monthEquation.first === '') {
                setIsEveryMonthOfYear(true)
            } else {
                setIsEveryMonthOfYear(false)
            }
            setMonths([])
            newMonthEquation.second = event.target.value;
            setMonthEquation(newMonthEquation);
        } else if (event.target.id === 'month-each-year-checked') {
            if (isEveryMonthOfYear === false) {
                setIsEveryMonthOfYear(true)
                setMonthEquation(
                    {
                        first: '',
                        second: ''
                    }
                )
            }
        }
    }

    return (
        <>
            {
                // (
                //     days.length > 0 
                //     || 
                //     (
                //         (dayEquation.first !== '' || dayEquation.second !== '') 
                //         || 
                //         isEveryDayOfWeekEachMonth === true
                //     )
                // )
                // &&
                <>
                    <hr />

                    <h3>Months Per Year</h3>

                    <span>* If nothing is selected in the month section, the default will be every month. *</span>

                    <section className="subsection">
                        <label 
                            id="month-equation-label"
                        >
                            <p>
                            Every {' '}
                            <input 
                                type="number" 
                                id="month-equation-first-num" 
                                min="1"  
                                onChange={handleChangeMonthPattern} 
                                value={monthEquation.first}
                            /> 
                            <i> n </i> 
                            + {' '}
                            <input 
                                type="number" 
                                id="month-equation-second-num" 
                                min="0" 
                                onChange={handleChangeMonthPattern} 
                                value={monthEquation.second}
                            /> 
                            {' '} months
                            </p>
                        </label>
                        <p>ie. </p>
                    </section>

                    <section className="subsection">
                        <div>
                            <input 
                                type="checkbox" name="month-each-year-checked" 
                                id="month-each-year-checked" 
                                onChange={handleChangeMonthPattern} 
                                checked={isEveryMonthOfYear}
                            />
                            <label 
                                htmlFor="month-each-year-checked"
                            >
                                Every {' '}
                                {months.length > 0 ? months.join(', ') : 'month'} 
                                {' '} of each year
                            </label>
                        </div>
                    </section>

                    <article>
                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="January" 
                                onChange={handleChangeMonth} 
                                value="January" 
                                checked={months.includes('January')} 
                            />
                            <label htmlFor="January">January</label>  
                        </div>
                        
                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="February" 
                                onChange={handleChangeMonth} 
                                value="February" 
                                checked={months.includes('February')} 
                            />
                            <label htmlFor="February">February</label>  
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="March" 
                                onChange={handleChangeMonth} 
                                value="March" 
                                checked={months.includes('March')} 
                            />
                            <label htmlFor="March">March</label>  
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="April" 
                                onChange={handleChangeMonth} 
                                value="April" 
                                checked={months.includes('April')} 
                            />
                            <label htmlFor="April">April</label>  
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="May" 
                                onChange={handleChangeMonth} 
                                value="May" 
                                checked={months.includes('May')} 
                            />
                            <label htmlFor="May">May</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="June" 
                                onChange={handleChangeMonth} 
                                value="June" 
                                checked={months.includes('June')} 
                            />
                            <label htmlFor="June">June</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="July" 
                                onChange={handleChangeMonth} 
                                value="July" 
                                checked={months.includes('July')} 
                            />
                            <label htmlFor="July">July</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="August" 
                                onChange={handleChangeMonth} 
                                value="August" 
                                checked={months.includes('August')} 
                            />
                            <label htmlFor="August">August</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="September" 
                                onChange={handleChangeMonth} 
                                value="September" 
                                checked={months.includes('September')} 
                            />
                            <label htmlFor="September">September</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="October" 
                                onChange={handleChangeMonth} 
                                value="October" 
                                checked={months.includes('October')} 
                            />
                            <label htmlFor="October">October</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="November" 
                                onChange={handleChangeMonth} 
                                value="November" 
                                checked={months.includes('November')} 
                            />
                            <label htmlFor="November">November</label> 
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                name="month-each-year-select" 
                                id="December" 
                                onChange={handleChangeMonth} 
                                value="December" 
                                checked={months.includes('December')} 
                            />
                            <label htmlFor="December">December</label> 
                        </div>
                    </article>                
                </>
            }
        </>
    )
}