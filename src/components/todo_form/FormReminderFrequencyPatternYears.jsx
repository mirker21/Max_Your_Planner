import { useState } from "react";

export default function FormReminderFrequencyPatternYears({
    years,
    setYears,
    yearEquation,
    setYearEquation,
    isEveryYear,
    setIsEveryYear,
    yearRange,
    setYearRange,
    currentYear
}) {
    const [year, setYear] = useState('');

    function handleChangeYear(event) {
        if (event.target.value === '' && year === '') {
            setIsEveryYear(true)
        } else if (event.target.value.match(/\D/) === null) {
            setIsEveryYear(false)        
            setYearEquation(
                {
                    first: '',
                    second: ''
                }
            )
            setYearRange(
                {
                    start: '',
                    end: ''
                }
            );
        }

        if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
            setYear(event.target.value);
        }
    }

    function handleAddYear() {
        setIsEveryYear(false)
        let newYears = [...years];
        newYears.push(year);
        setYears([...newYears]);
    }

    function removeYear(event) {
        let newYears = [...years];
        newYears = newYears.filter(year => year !== event.target.id)
        if (newYears.length === 0) {
            setIsEveryYear(true)
        }
        setYears([...newYears])
    }

    function handleChangeYearPattern(event) {
        if (event.target.id === 'year-equation-first-num') {
            let newYearEquation = {...yearEquation};
            if (event.target.value === '' && yearEquation.second === '') {
                setIsEveryYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryYear(false)
                setYears([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newYearEquation.first = event.target.value;
            }
            
            setYearEquation(newYearEquation);
        } else if (event.target.id === 'year-equation-second-num') {
            let newYearEquation = {...yearEquation};
            if (event.target.value === '' && yearEquation.first === '') {
                setIsEveryYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryYear(false)
                setYears([])
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newYearEquation.second = event.target.value;
            }
            
            setYearEquation(newYearEquation);
        } else if (event.target.id === 'every-year-checked') {
            if (isEveryYear === false) {
                setYear('');
                setYears([])
                setIsEveryYear(true)
                setYearEquation(
                    {
                        first: '',
                        second: ''
                    }
                )
                setYearRange(
                    {
                        start: '',
                        end: ''
                    }
                );
            }
        } else if (event.target.id === 'select-years-range-start') {
            let newYearRange = {...yearRange};
            if (event.target.value === '' && yearRange.end === '') {
                setIsEveryYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryYear(false)
                setYears([])
                setYear('');
                setYearEquation(
                    {
                        first: '',
                        second: ''
                    }
                )
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newYearRange.start = event.target.value;
                newYearRange.end = `${(event.target.value.length === 0 ? '' : parseInt(event.target.value)) + (event.target.value.length === 0 ? '' : parseInt('1'))}`;
                console.log(newYearRange.start)
                console.log(newYearRange.end)
                setYearRange(newYearRange);
            }
            
        } else if (event.target.id === 'select-years-range-end') {
            let newYearRange = {...yearRange};
            if (event.target.value === '' && yearRange.start === '') {
                setIsEveryYear(true)
            } else if (event.target.value.match(/\D/) === null) {
                setIsEveryYear(false)
                setYears([])
                setYear('');
                setYearEquation(
                    {
                        first: '',
                        second: ''
                    }
                )
            }

            if ((event.target.value.match(/\D/) === null && event.target.value !== ' ') || event.target.value === '') {
                newYearRange.end = event.target.value;
                setYearRange(newYearRange);
            }

        }
    }

    function handleBlur(event) {
        if (event.target.value < yearRange.start) {
            let newYearRange = {...yearRange};
            newYearRange.end = parseInt(newYearRange.start) + 1;
            setYearRange(newYearRange)
        }
    }

    return (
        <>
            <hr aria-hidden="true" />

            <h3 
                aria-label={
                    'Pattern Reminder Frequency: Years Section.'
                    +
                    ' Here, you can customize the years pattern for the reminder frequency,'
                    +
                    ' by adding a linear equation, or only'
                    +
                    ' having this notification happen on specific individual years,'
                    +
                    ' or only having this notification happen within a specific range of years'
                }
            >
                Specific Years
            </h3>

            <span aria-label="Note: If nothing is selected in the year section, the default will be every year.">* If nothing is selected in the year section, the default will be every year. *</span>

            <section className="subsection">
                <label 
                    id="year-equation-label"
                >
                    <span aria-hidden="true">Every {' '}</span>
                    <input 
                        aria-label="Year Equation Pattern, First Number input to the equation First Number × n + Second Number"
                        type="text" 
                        id="year-equation-first-num"
                        minLength={0}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        onChange={handleChangeYearPattern}
                        value={yearEquation.first}
                    /> 
                    <i aria-hidden="true">n +</i> 
                    <input 
                        aria-label="Year Equation Pattern, Second Number input to the equation First Number × n + Second Number"
                        type="text" 
                        id="year-equation-second-num"
                        minLength={0}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        onChange={handleChangeYearPattern}
                        value={yearEquation.second}
                    /> 
                    <span aria-hidden="true">{' '} years</span>
                </label>

                {   
                    yearEquation.first !== '' || yearEquation.second !== ''
                    ?
                    <p 
                        aria-label={
                            'Current Year Equation Set To: ' 
                            + 
                            ((yearEquation.first === '1' || yearEquation.first === '') ? '' : yearEquation.first + 'n + ') 
                            + 
                            (yearEquation.second === '' ? '0' : yearEquation.second)
                        }
                    >
                        Year Equation: {(yearEquation.first === '1' || yearEquation.first === '') ? '' : yearEquation.first}n + {yearEquation.second === '' ? '0' : yearEquation.second}
                    </p>
                    :
                    <></>
                }
            </section>

            <section className="subsection">
                <div>
                    <input 
                        aria-label="Is every year"
                        type="checkbox" name="every-year-checked" 
                        id="every-year-checked" 
                        onChange={handleChangeYearPattern} 
                        checked={isEveryYear === true}
                    />
                    <label 
                        aria-hidden="true"
                        htmlFor="every-year-checked"
                    >
                        Every Year
                    </label>
                </div>
            </section>
                
            <section className="subsection">
                <div>
                    <input 
                        aria-label="Enter new individual year"
                        type="text" 
                        name="select-years" 
                        id="select-years" 
                        minLength={0}
                        maxLength={4}
                        inputMode="numeric"
                        pattern="[0-9]{0, 4}"
                        onChange={handleChangeYear}
                        value={year}
                    />
                    <label aria-hidden="true" htmlFor="select-years">Year</label>
                </div>

                <button 
                    aria-disabled={year.length < 4 || years.includes(year)}
                    disabled={year.length < 4 || years.includes(year)}
                    aria-label={year.length >= 4 && !years.includes(year) ? 'Add Year' : years.includes(year) ? year + ' was already added' : 'Year is empty'} 
                    type="button" 
                    onClick={handleAddYear}
                >
                    Add Year
                </button>

                {
                    years.length > 0
                    &&
                    <div className="result">
                        <hr aria-hidden="true" />

                        <h3 aria-hidden="true">Years</h3>

                        <ul aria-label="Years added">
                            {
                                years.map((year, index) => {
                                    return (    
                                        <li aria-label={'Number ' + index + ' ' + year} className="list-item" key={year + index} id={year + index}>
                                            <button type="button" id={year} onClick={removeYear}>×</button>
                                            <p aria-hidden="true">{year}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }  
            </section>

            <section className="subsection" id="select-years-range">                
                <div id="select-years-range-container">
                    <input 
                        aria-label="Year Range Pattern, input for range start"
                        type="text" 
                        name="select-years-range-start" 
                        id="select-years-range-start" 
                        pattern="[0-9]{0, 4}"
                        minLength={0}                        
                        maxLength={4}
                        inputMode="numeric"
                        onChange={handleChangeYearPattern}
                        value={yearRange.start}
                    /> 
                    <span aria-hidden="true">
                       - 
                    </span>
                    <input 
                        aria-label="Year Range Pattern, input for range end, must be at least one year greater than range start"
                        type="text" 
                        name="select-years-range-end" 
                        id="select-years-range-end" 
                        pattern="[0-9]{0, 4}"
                        minLength={0}                        
                        maxLength={4}
                        inputMode="numeric"
                        onChange={handleChangeYearPattern}
                        onBlur={handleBlur}
                        value={yearRange.end}
                    />
                </div>
                <label aria-hidden="true">Range</label>  
            </section>                
        </>
    )
}