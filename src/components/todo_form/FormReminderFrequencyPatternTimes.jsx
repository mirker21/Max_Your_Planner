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
            <h3 aria-label="Pattern Reminder Frequency: Time Section. You can either add specific times, or have the notification set to All-Day">Times of Day</h3>

            <span aria-label="Note: If nothing is selected in the time section, the default will be all-day.">* If nothing is selected in the time section, the default will be all-day. *</span>

            <section className="subsection">
                <div>
                    <input 
                        aria-label="Set time for Pattern Reminder Frequency to All-Day"
                        type="checkbox" 
                        id="pattern-all-day-checked" 
                        onChange={handleChangeTime} 
                        checked={allDay} 
                    />
                    <label aria-hidden="true" htmlFor="pattern-all-day-checked">All-Day</label>
                </div>
            </section>

            <section className="subsection">
                <div>
                    <input 
                        aria-label="Add specific times to this Pattern Reminder Frequency"
                        type="time" 
                        id="pattern-specific-time-input" 
                        onChange={handleChangeTime} 
                        value={time} 
                    />
                    <label aria-hidden="true" htmlFor="pattern-specific-time-input">Choose Specific Time</label>
                </div>

                <button 
                    disabled={time === '' && times.some(singleTime => singleTime === time)}
                    aria-disabled={time === '' && times.some(singleTime => singleTime === time)}
                    aria-label={
                        (time !== '' && !times.some(singleTime => singleTime === time)) 
                        ? 'Add Time' 
                        : time === '' 
                        ? 'Cannot add time, time is empty' 
                        : time + ' was already added'
                    } 
                    type="button" 
                    onClick={handleAddTime}
                >
                    Add Time
                </button>
            </section>

            {
                times.length > 0

                &&

                <div className="result">
                    <hr  aria-hidden="true" />

                    <h3 aria-hidden="true">Set Times Each Day</h3>

                    <ul className="pattern-times-list" aria-label="Scheduled Times for this Notification: ">
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
                                        <button aria-label={'Remove ' + time} type="button" className="remove-time-button" onClick={removeTime}>×</button>
                                        <p aria-hidden="true">{displayedTime}</p>
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