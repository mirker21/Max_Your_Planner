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
        setIsEveryYear(true)
        setYear(event.target.value);
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
            } else {
                setIsEveryYear(false)
            }
            setYears([])
            newYearEquation.first = event.target.value;
            setYearEquation(newYearEquation);
        } else if (event.target.id === 'year-equation-second-num') {
            let newYearEquation = {...yearEquation};
            if (event.target.value === '' && yearEquation.first === '') {
                setIsEveryYear(true)
            } else {
                setIsEveryYear(false)
            }
            setYears([])
            newYearEquation.second = event.target.value;
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
            } else {
                setIsEveryYear(false)
            }
            setYear('');
            setYears([])
            setYearEquation(
                {
                    first: '',
                    second: ''
                }
            )
            if (event.target.value >= newYearRange.end) {
                newYearRange.start = event.target.value;
                newYearRange.end = `${parseInt(event.target.value) + 1}`;
            } else {
                newYearRange.start = event.target.value;
            }
            setYearRange(newYearRange);
        } else if (event.target.id === 'select-years-range-end') {
            let newYearRange = {...yearRange};
            if (event.target.value === '' && yearRange.start === '') {
                setIsEveryYear(true)
            } else {
                setIsEveryYear(false)
            }
            setYear('');
            setYears([])
            setYearEquation(
                {
                    first: '',
                    second: ''
                }
            )
            if (event.target.value > newYearRange.start || event.target.value === '') {
                newYearRange.end = event.target.value;
            }
            setYearRange(newYearRange);
        }
    }

    return (
        <>
            <hr />

            <h3>Specific Years</h3>

            <span>* If nothing is selected in the year section, the default will be every year. *</span>

            <section className="subsection">
                <label 
                    id="year-equation-label"
                >
                    <p>
                    Every {' '}
                    <input 
                        type="number" 
                        id="year-equation-first-num"
                        min="1"
                        onChange={handleChangeYearPattern}
                        value={yearEquation.first}
                    /> 
                    <i> n </i> 
                    + {' '}
                    <input 
                        type="number" 
                        id="year-equation-second-num"
                        min="0"
                        onChange={handleChangeYearPattern}
                        value={yearEquation.second}
                    /> 
                    {' '} years
                    </p>
                </label>
                <p>ie. </p>
            </section>

            <section className="subsection">
                <div>
                    <input 
                        type="checkbox" name="every-year-checked" 
                        id="every-year-checked" 
                        onChange={handleChangeYearPattern} 
                        checked={isEveryYear === true}
                    />
                    <label 
                        htmlFor="every-year-checked"
                    >
                        Every Year
                    </label>
                </div>
            </section>
                
            <section className="subsection">
                <div>
                    <input 
                        type="number" 
                        name="select-years" 
                        id="select-years" 
                        min={currentYear} 
                        step="1"
                        onChange={handleChangeYear}
                        value={year}
                    />
                    <label htmlFor="select-years">Year</label>
                </div>

                {
                    year.length >= 4 && !years.includes(year)
                    &&
                    <button type="button" onClick={handleAddYear}>Add Year</button>
                }

                {
                    years.length > 0
                    &&
                    <div className="result">
                        <hr />

                        <h3>Years</h3>

                        <li>
                            {
                                years.map((year, index) => {
                                    return (    
                                        <ul className="list-item" key={year + index} id={year + index}>
                                            <button type="button" id={year} onClick={removeYear}>×</button>
                                            <p>{year}</p>
                                        </ul>
                                    )
                                })
                            }
                        </li>
                    </div>
                }  
            </section>

            <section className="subsection">                
                <div>
                    <input 
                        type="number" 
                        name="select-years-range-start" 
                        id="select-years-range-start" 
                        min={currentYear} 
                        step="1"
                        onChange={handleChangeYearPattern}
                        value={yearRange.start}
                    /> 
                        -
                    <input 
                        type="number" 
                        name="select-years-range-end" 
                        id="select-years-range-end" 
                        min={currentYear + 1} 
                        step="1"
                        onChange={handleChangeYearPattern}
                        value={yearRange.end}
                    />
                    <label>Range</label>  
                </div>
            </section>                
        </>
    )
}