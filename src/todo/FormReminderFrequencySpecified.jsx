import { useEffect, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";

export default function FormReminderFrequencySpecified({datesTimes, setDatesTimes}) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [allDay, setAllDay] = useState(false);

    function handleChange(event) {
        if (event.target.id === 'specified-date-input') {
            if (event.target.value === '') {
                setTimes([])
            }
            setDate(event.target.value);
        } else if (event.target.id === 'specified-time-input') {
            setTime(event.target.value);
            setAllDay(false);
        } else if (event.target.id === 'specified-all-day-checked') {
            if (allDay == true) {
                setAllDay(!allDay);
            } else {
                setTime('')
                setTimes([])
                setAllDay(!allDay);
            }
        }
    }

    function handleAddTime() {
        if (time !== '') {
            let newTime = time;
            const newTimes = [...times, newTime];
            setTimes([...newTimes]);
            setTime('');
        }
    }

    function removeTime(event) {
        let newTimes = [...times];
        newTimes = newTimes.filter((time, index) => {
            return time + index !== event.target.parentNode.id;
        })
        setTimes([...newTimes])
    }

    function handleAddDateTimes() {
        if (date !== '' && (times.length > 0 || allDay === true)) {
            const newDateTime = {
                id: generateUUID(),
                date: date,
                times: times.length > 0 ? [...times] : 'All-Day'
            };

            const newDatesTimes = [...datesTimes, newDateTime];
            setDatesTimes([...newDatesTimes]);
            setDate('')
            setTime('')
            setTimes([])
        }
    }

    function handleEditDateTime(event) {
        let newDatesTimes = [...datesTimes];
        let foundIndex = newDatesTimes.findIndex(dateTime => event.target.id.includes(dateTime.id))
        let foundEntry = newDatesTimes[foundIndex];

        if (event.target.className === 'date-input') {
            if (newDatesTimes.every(dateTime => dateTime.date !== event.target.value)) {
                foundEntry['date'] = event.target.value;
                newDatesTimes[foundIndex] = foundEntry;
                setDatesTimes([...newDatesTimes]);
            }
        } else if (event.target.className === 'time-input') {
            if (foundEntry.times.every(time => time !== event.target.value)) {
                let foundTimeIndex = event.target.id.replace(foundEntry.id, '');
                foundEntry.times[foundTimeIndex] = event.target.value;
                newDatesTimes[foundIndex] = foundEntry;
                setDatesTimes([...newDatesTimes]);
            }
        }
    }

    function removeDateTime(event) {
        let newDatesTimes = [...datesTimes];
        let foundIndex = newDatesTimes.findIndex(dateTime => event.target.id.includes(dateTime.id))
        let foundEntry = newDatesTimes[foundIndex];

        if (event.target.className === 'remove-date-button') {
            newDatesTimes.splice(foundIndex, 1);
            setDatesTimes([...newDatesTimes]);
        } else if (event.target.className === 'remove-time-button') {
            let foundTimeIndex = event.target.id.replace(foundEntry.id, '');
            foundEntry.times = foundEntry.times.splice(foundTimeIndex, 1);
            if (foundEntry.times.length === 0) {
                newDatesTimes.splice(foundIndex, 1);
            } else {
                newDatesTimes[foundIndex] = foundEntry;
            }
            setDatesTimes([...newDatesTimes]);
        }
    }

    console.log(date, times, allDay)

    return (
        <section>
            <h3>Date And Time</h3>

            <section className="subsection">
                <div id="specific-date-time-container">
                    <input type='date' id="specified-date-input" onChange={handleChange} value={date} />
                    <label htmlFor="specified-date-input">Choose Specific Date</label>
                </div>
            </section>

            {
                date !== '' && (datesTimes?.length === 0 || !datesTimes?.every(dateTime => dateTime.date === date))
                &&
                <>
                    <section className="subsection">
                        <div>
                            <input type="time" id="specified-time-input" onChange={handleChange} value={time} />
                            <label htmlFor="specified-time-input">Choose Specific Time</label>
                        </div>

                        {
                            time !== '' && (times.length === 0 || !times?.some(oneTime => oneTime === time))
                            &&
                            <button type="button" onClick={handleAddTime}>Add Time</button>
                        }
                    </section>
                    
                    <section className="subsection">
                        <div>
                            <input type="checkbox" id="specified-all-day-checked" onChange={handleChange} checked={allDay} />
                            <label htmlFor="specified-all-day-checked">All-Day</label>
                        </div>
                    </section>

                    {
                        times.length > 0
                        &&
                        <div className="result">
                            <hr />

                            <h3>Times for {date}</h3>

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
                                                <button type="button" className="remove-time-button" onClick={removeTime}>×</button>
                                                <p>{displayedTime}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }

                    {
                        allDay === true
                        &&
                        <div className="result">
                            <hr />
                            <h3>{date} - (All-Day)</h3>
                        </div>
                    }

                    {
                        ((times.length > 0 && date !== '') || (date !== '' && allDay === true))
                        &&
                        <button type="button" onClick={handleAddDateTimes}>Add Date and Time</button>
                    }

                    
                </>
            }

            {
                datesTimes.length > 0
                &&
                <div id="date-times-result">
                    <hr />

                    <h3>All Dates And Times</h3>

                    <div className="pattern-dates-times-list">
                        {
                            datesTimes.map((dateTime, index) => {
                                let timeId = '';
                                if (dateTime.times === 'All-Day') {
                                    timeId = 'All-Day';
                                }

                                return (
                                    <div 
                                        key={dateTime.id + 'main'} 
                                        className="result single-date-times-container" 
                                        id={dateTime.id  + 'main'}
                                    >
                                        <div className="result-date-container">
                                            <button 
                                                type="button" 
                                                className="remove-date-button" 
                                                id={dateTime.id + dateTime.date} 
                                                onClick={removeDateTime}
                                            >
                                                ×
                                            </button>

                                            <input 
                                                type="date" 
                                                className="date-input" 
                                                id={dateTime.id + dateTime.date + index} 
                                                value={dateTime.date}
                                                onChange={handleEditDateTime} 
                                            />
                                        </div>
                                    
                                        <ul className="pattern-times-list">
                                            {
                                                dateTime.times === 'All-Day'
                                                ?
                                                <li 
                                                    className="list-item" 
                                                    key={dateTime.id + timeId} 
                                                    id={dateTime.id + timeId}
                                                >
                                                    <button 
                                                        type="button" 
                                                        className="remove-time-button" 
                                                        id={dateTime.id + timeId} 
                                                        onClick={removeDateTime}
                                                    >
                                                        ×
                                                    </button>

                                                    <p>{dateTime.times}</p>
                                                </li>
                                                :
                                                dateTime.times?.map((time, timeIndex) => {
                                                    timeId = time;

                                                    return (
                                                        <li 
                                                            className="list-item" 
                                                            key={dateTime.id + timeId} 
                                                            id={dateTime.id + timeId}
                                                        >
                                                            <button 
                                                                type="button" 
                                                                className="remove-time-button" 
                                                                id={dateTime.id + timeId} 
                                                                onClick={removeDateTime}
                                                            >
                                                                ×
                                                            </button>

                                                            <input 
                                                                className="time-input" 
                                                                type="time" 
                                                                id={dateTime.id + timeIndex} 
                                                                value={time} 
                                                                onChange={handleEditDateTime} 
                                                            />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </section>
    )
}