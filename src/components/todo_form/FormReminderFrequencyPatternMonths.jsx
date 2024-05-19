export default function FormReminderFrequencyPatternMonths({
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

    // Edit handlechange

    function handleChangeMonthPattern(event) {
        if (event.target.id === 'month-equation-first-num') {
            let newMonthEquation = {...monthEquation};
            if (event.target.value === '' && monthEquation.second === '') {
                setIsEveryMonthOfYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryMonthOfYear(false)
                setMonths([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newMonthEquation.first = event.target.value;
            }

            setMonthEquation(newMonthEquation);
        } else if (event.target.id === 'month-equation-second-num') {
            let newMonthEquation = {...monthEquation};
            if (event.target.value === '' && monthEquation.first === '') {
                setIsEveryMonthOfYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryMonthOfYear(false)
                setMonths([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newMonthEquation.second = event.target.value;
            }

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
            <hr aria-hidden="true" />

            <h3 
                aria-label={
                    'Pattern Reminder Frequency: Months Of Year Section.'
                    +
                    ' Here, you can customize the month pattern for the reminder frequency,'
                    +
                    ' by adding a linear equation, or only'
                    +
                    ' having this notification happen on specific months'
                }
            >
                Months Of Year
            </h3>

            <span aria-label="Note: If nothing is selected in the month section, the default will be every month.">* If nothing is selected in the month section, the default will be every month. *</span>

            <section className="subsection">
                <label 
                    id="month-equation-label"
                >
                    <span aria-hidden="true">Every {' '}</span>
                    <input 
                        aria-label="Months Of Year Equation Pattern, First Number input to the equation First Number × n + Second Number"
                        type="text"
                        pattern="[0-9]*" 
                        inputMode="numeric"
                        id="month-equation-first-num" 
                        minLength={0} 
                        onChange={handleChangeMonthPattern} 
                        value={monthEquation.first}
                    /> 
                    <i aria-hidden="true"> n + {' '}</i> 
                    <input 
                        aria-label="Months Of Year Equation Pattern, Second Number input to the equation First Number × n + Second Number"
                        type="text"
                        pattern="[0-9]*" 
                        inputMode="numeric"
                        id="month-equation-second-num" 
                        minLength={0}
                        onChange={handleChangeMonthPattern} 
                        value={monthEquation.second}
                    /> 
                    <span aria-hidden="true">{' '} months</span>
                </label>

                {   
                    monthEquation.first !== '' || monthEquation.second !== ''
                    ?
                    <p 
                        aria-label={
                            'Current Month Equation Set To: ' 
                            + 
                            ((monthEquation.first === '1' || monthEquation.first === '') ? '' : monthEquation.first + 'n + ') 
                            + 
                            (monthEquation.second === '' ? '0' : monthEquation.second)
                        }
                    >
                        Month Equation: {(monthEquation.first === '1' || monthEquation.first === '') ? '' : monthEquation.first}n + {monthEquation.second === '' ? '0' : monthEquation.second}
                    </p>
                    :
                    <></>
                }
            </section>

            <section className="subsection">
                <div>
                    <input 
                        aria-label={'Is set to every ' + (months.length > 0 ? months.join(', ') : 'month or only the checked months') + ' of each year'}
                        type="checkbox" name="month-each-year-checked" 
                        id="month-each-year-checked" 
                        onChange={handleChangeMonthPattern} 
                        checked={isEveryMonthOfYear}
                    />
                    <label 
                        aria-hidden="true"
                        htmlFor="month-each-year-checked"
                    >
                        Every {' '}
                        {months.length > 0 ? months.join(', ') : 'month'} 
                        {' '} of each year
                    </label>
                </div>
            </section>

            <ul aria-label="Months of Year Checkboxes">
                <li>
                    <input
                        aria-label="Check this input for January"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="January" 
                        onChange={handleChangeMonth} 
                        value="January" 
                        checked={months.includes('January')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="January">January</label>   
                </li>
                
                <li>
                    <input
                        aria-label="Check this input for February"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="February" 
                        onChange={handleChangeMonth} 
                        value="February" 
                        checked={months.includes('February')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="February">February</label>   
                </li>

                <li>
                    <input
                        aria-label="Check this input for March"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="March" 
                        onChange={handleChangeMonth} 
                        value="March" 
                        checked={months.includes('March')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="March">March</label>   
                </li>

                <li>
                    <input
                        aria-label="Check this input for April"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="April" 
                        onChange={handleChangeMonth} 
                        value="April" 
                        checked={months.includes('April')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="April">April</label>   
                </li>

                <li>
                    <input
                        aria-label="Check this input for May"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="May" 
                        onChange={handleChangeMonth} 
                        value="May" 
                        checked={months.includes('May')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="May">May</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for June"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="June" 
                        onChange={handleChangeMonth} 
                        value="June" 
                        checked={months.includes('June')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="June">June</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for July"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="July" 
                        onChange={handleChangeMonth} 
                        value="July" 
                        checked={months.includes('July')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="July">July</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for August"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="August" 
                        onChange={handleChangeMonth} 
                        value="August" 
                        checked={months.includes('August')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="August">August</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for September"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="September" 
                        onChange={handleChangeMonth} 
                        value="September" 
                        checked={months.includes('September')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="September">September</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for October"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="October" 
                        onChange={handleChangeMonth} 
                        value="October" 
                        checked={months.includes('October')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="October">October</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for November"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="November" 
                        onChange={handleChangeMonth} 
                        value="November" 
                        checked={months.includes('November')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="November">November</label>  
                </li>

                <li>
                    <input
                        aria-label="Check this input for December"
                        type="checkbox" 
                        name="month-each-year-select" 
                        id="December" 
                        onChange={handleChangeMonth} 
                        value="December" 
                        checked={months.includes('December')} 
                    />
                    <label aria-hidden="true" className="black-text-label" htmlFor="December">December</label>  
                </li>
            </ul>                
        </>

    )
}