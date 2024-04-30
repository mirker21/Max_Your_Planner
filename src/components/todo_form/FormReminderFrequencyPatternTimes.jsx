import { useState } from "react";

export default function FormReminderFrequencyPatternTimes({
    times,
    setTimes,
    allDay,
    setAllDay
}) {
    const [time, setTime] = useState('');

    function handleChangeTime(event) {
        if (event.target.id === 'pattern-specific-time-input') {
            if (event.target.value === '') {
                setTimes([])
            }
            setTime(event.target.value);
        } else if (event.target.id === 'pattern-specific-time-input') {
            setTime(event.target.value);
        } else if (event.target.id === 'pattern-all-day-checked') {
            if (allDay == true) {
                setAllDay(false);
            } else {
                setTime('')
                setTimes([]);
                setAllDay(true);
            }
        }
    }

    function handleAddTime() {
        if (time !== '') {
            let newTime = time;
            const newTimes = [...times, newTime];
            setTimes([...newTimes]);
            setTime('');
            setAllDay(false)
        }
    }

    function removeTime(event) {
        let newTimes = [...times];
        newTimes = newTimes.filter((time, index) => {
            return time + index !== event.target.parentNode.id;
        })
        if (newTimes.length === 0) {
            setAllDay(true)
        }
        setTimes([...newTimes])
    }

    return (
        <>
            <h3>Times of Day</h3>

            <span>* If nothing is selected in the time section, the default will be all-day. *</span>

            <section className="subsection">
                <div>
                    <input 
                        type="checkbox" 
                        id="pattern-all-day-checked" 
                        onChange={handleChangeTime} 
                        checked={allDay} 
                    />
                    <label htmlFor="pattern-all-day-checked">All-Day</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input 
                        type="time" 
                        id="pattern-specific-time-input" 
                        onChange={handleChangeTime} 
                        value={time} 
                    />
                    <label htmlFor="pattern-specific-time-input">Choose Specific Time</label>
                </div>

                {
                    time !== ''
                    &&
                    <button type="button" onClick={handleAddTime}>Add Time</button>
                }
            </section>

            {
                times.length > 0

                &&

                <div className="result">
                    <hr />

                    <h3>Set Times Each Day</h3>

                    <ul className="pattern-times-list">
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
                                    <li className="list-item" key={time + index} id={time + index}>
                                        <button type="button" onClick={removeTime}>×</button>
                                        <p>{displayedTime}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </>
    )
}