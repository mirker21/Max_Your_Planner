import { useState } from "react";

export default function ReminderFrequencyPattern({currentYear, patternDisplay}) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [allDay, setAllDay] = useState(false);

    function handleChangeTime(event) {
        if (event.target.id === 'pattern-specific-time-input') {
            if (event.target.value === '') {
                setTimes([])
            }
            setDate(event.target.value);
        } else if (event.target.id === 'pattern-specific-time-input') {
            setTime(event.target.value);
            setAllDay(false);
        } else if (event.target.id === 'pattern-all-day-checked') {
            if (allDay == true) {
                setAllDay(!allDay);
            } else {
                setTime('')
                setAllDay(!allDay);
            }
        }
    }

    function handleChangeDay(event) {

    }

    function handleChangeMonth(event) {

    }

    function handleChangeYear(event) {

    }

    return (
        <section>
            <h3>Times of Day</h3>

            <span>* If nothing is selected in the time section, the default will be all-day. *</span>

            <section className="subsection">
                <div>
                    <input type="checkbox" id="pattern-all-day-checked" onChange={handleChangeTime} checked={allDay} />
                    <label htmlFor="all-day-checked">All-Day</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="time" id="pattern-specific-time-input" onChange={handleChangeTime} value={time} />
                    <label htmlFor="specific-time-input">Choose Specific Time</label>
                </div>
            </section>

            <button type="button">Add Time</button>

            {
                times.length > 0

                &&

                <div>
                    <hr />

                    <h3>Set Times Each Day</h3>

                    <li>
                        {
                            times.map((time, index) => {
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

                                return (    
                                    <ul className="list-item" key={time + index} id={time + index}>
                                        <button type="button" onClick={removeTime}>×</button>
                                        <p>{displayedTime}</p>
                                    </ul>
                                )
                            })
                        }
                    </li>
                </div>
            }

            <hr />

            <h3>Days of Week</h3>

            <span>* If nothing is selected in the days of week section, the default will be every day. *</span>
            
            <section className="subsection">
                <label id="day-of-week-equation-label"><p>Every <input type="number" min="1"/> <i>n</i> + <input type="number" min="0"/> days</p></label>
                <p>ie. </p>
            </section>

            <section className="subsection">
                <div>
                    <input type="checkbox" name="day-of-week-each-month-checked" id="day-of-week-each-month-checked"/>
                    <label htmlFor="day-of-week-each-month-checked">Every (day of week) each month</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input type="number" id="nth-day-of-week-each-month" name="nth-day-of-week-each-month" min="1" max="5"/>
                    <label htmlFor="nth-day-of-week-each-month">Every nth (day of week) each month</label>  
                </div>
            </section>

            <article>
                <div>
                    <input type="checkbox" name="days-of-week" id="sunday" value="sunday"/>
                    <label htmlFor="sunday">Sunday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="monday" value="monday"/>
                    <label htmlFor="monday">Monday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="tuesday" value="tuesday"/>
                    <label htmlFor="tuesday">Tuseday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="wednesday" value="wednesday"/>
                    <label htmlFor="wednesday">Wednesday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="thursday" value="thursday"/>
                    <label htmlFor="thursday">Thursday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="friday" value="friday"/>
                    <label htmlFor="friday">Friday</label>
                </div>

                <div>
                    <input type="checkbox" name="days-of-week" id="saturday" value="saturday"/>
                    <label htmlFor="saturday">Saturday</label>
                </div>
            </article>

            <hr />

            <h3>Months Per Year</h3>

            <span>* If nothing is selected in the month section, the default will be every month. *</span>

            <section className="subsection">
                <label id="month-equation-label"><p>Every <input type="number" min="1"/> <i>n</i> + <input type="number" min="0"/> months</p></label>
                <p>ie. </p>
            </section>

            <section className="subsection">
                <div>
                    <input type="checkbox" name="month-each-year-checked" id="month-each-year-checked"/>
                    <label htmlFor="month-each-year-checked">Only every (Month) each year</label>
                </div>
            </section>

            <article>
                <div>
                    <input type="checkbox" name="month-each-year-select" id="january" onChange={handleChangeMonth} value="january" />
                    <label htmlFor="january">January</label>  
                </div>
                
                <div>
                    <input type="checkbox" name="month-each-year-select" id="february" onChange={handleChangeMonth} value="february" />
                    <label htmlFor="february">February</label>  
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="march" onChange={handleChangeMonth} value="march" />
                    <label htmlFor="march">March</label>  
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="april" onChange={handleChangeMonth} value="april" />
                    <label htmlFor="april">April</label>  
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="may" onChange={handleChangeMonth} value="may" />
                    <label htmlFor="may">May</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="june" onChange={handleChangeMonth} value="june" />
                    <label htmlFor="june">June</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="july" onChange={handleChangeMonth} value="july" />
                    <label htmlFor="july">July</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="august" onChange={handleChangeMonth} value="august" />
                    <label htmlFor="august">August</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="september" onChange={handleChangeMonth} value="september" />
                    <label htmlFor="september">September</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="october" onChange={handleChangeMonth} value="october" />
                    <label htmlFor="october">October</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="november" onChange={handleChangeMonth} value="november" />
                    <label htmlFor="november">November</label> 
                </div>

                <div>
                    <input type="checkbox" name="month-each-year-select" id="december" onChange={handleChangeMonth} value="december" />
                    <label htmlFor="december">December</label> 
                </div>
            </article>
            
            <hr />

            <h3>Specific Years</h3>

            <span>* If nothing is selected in the year section, the default will be every year. *</span>

            <section className="subsection">
                <label id="year-equation-label"><p>Every <input type="number" min="1"/> <i>n</i> + <input type="number" min="0"/> years</p></label>
                <p>ie. </p>
            </section>
                
            <section className="subsection">
                <div>
                    <input type="number" name="select-years" id="select-years" min={currentYear} step="1"/>
                    <label htmlFor="select-years">Year</label>
                </div>

                <button type="button">Add Year</button>  
            </section>

            <section className="subsection">                
                <div>
                    <input type="number" name="select-years-range-start" id="select-years-range-start" min={currentYear} step="1"/> - <input type="number" name="select-years-range-end" id="select-years-range-end" min={currentYear} step="1"/>
                    <label>Range</label>  
                </div>
            </section>

            <hr />

            <div id="pattern-reminder">
                
                <h4>Pattern: {patternDisplay.default === true ? 'Default' : 'Custom'}</h4>
                <li>
                    <ul>Days: {patternDisplay.days}</ul>
                    <ul>Months: {patternDisplay.months}</ul>
                    <ul>Years: {patternDisplay.years}</ul>
                </li>
            </div>
        </section>
    )
}