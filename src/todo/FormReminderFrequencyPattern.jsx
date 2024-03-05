export default function ReminderFrequencyPattern({currentYear, patternDisplay}) {

    function handleChange() {

    }

    return (
                    <section>
                        <h3>Times of Day</h3>

                        <span>* If nothing is selected in the time section, the default will be all-day. *</span>

                        <section className="subsection">
                            <div>
                                <input type="checkbox" id="all-day-checked" />
                                <label htmlFor="all-day-checked">All-Day</label>
                            </div>
                        </section>

                        <section className="subsection">
                            <div>
                                <input type="time" id="specific-time-input" />
                                <label htmlFor="specific-time-input">Choose Specific Time</label>
                            </div>
                        </section>

                        {/* {
                            checklist.length > 0

                            &&

                            <div>
                                <hr />

                                <h3>Result</h3>

                                <li>
                                    {
                                        checklist.map(item => {
                                            <ul>
                                                <button type="button">×</button>
                                                <p>{item.name}</p>
                                            </ul>
                                        })
                                    }
                                </li>
                            </div>
                        } */}

                        <button type="button">Add Time</button>

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
                                <input type="checkbox" name="month-each-year-select" id="january" onChange={handleChange} value="january" />
                                <label htmlFor="january">January</label>  
                            </div>
                            
                            <div>
                                <input type="checkbox" name="month-each-year-select" id="february" onChange={handleChange} value="february" />
                                <label htmlFor="february">February</label>  
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="march" onChange={handleChange} value="march" />
                                <label htmlFor="march">March</label>  
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="april" onChange={handleChange} value="april" />
                                <label htmlFor="april">April</label>  
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="may" onChange={handleChange} value="may" />
                                <label htmlFor="may">May</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="june" onChange={handleChange} value="june" />
                                <label htmlFor="june">June</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="july" onChange={handleChange} value="july" />
                                <label htmlFor="july">July</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="august" onChange={handleChange} value="august" />
                                <label htmlFor="august">August</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="september" onChange={handleChange} value="september" />
                                <label htmlFor="september">September</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="october" onChange={handleChange} value="october" />
                                <label htmlFor="october">October</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="november" onChange={handleChange} value="november" />
                                <label htmlFor="november">November</label> 
                            </div>

                            <div>
                                <input type="checkbox" name="month-each-year-select" id="december" onChange={handleChange} value="december" />
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