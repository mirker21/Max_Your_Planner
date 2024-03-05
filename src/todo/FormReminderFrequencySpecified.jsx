import { useState } from "react";

export default function ReminderFrequencySpecified({datesTimes, setDatesTimes}) {
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
                setAllDay(!allDay);
            }
        }
    }

    function handleAddTime() {
        if (time !== '') {
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

            let newTime = hour + ':' + minute + ' ' + meridian;
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

    function removeDateTime(event) {

    }

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
                date !== ''
                &&
                <>
                    <section className="subsection">
                        <div>
                            <input type="time" id="specified-time-input" onChange={handleChange} value={time} />
                            <label htmlFor="specified-time-input">Choose Specific Time</label>
                        </div>

                        {
                            time !== ''
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

                            <li>
                                {
                                    times.map((time, index) => (
                                        <ul className="list-item" key={time + index} id={time + index}>
                                            <button type="button" onClick={removeTime}>×</button>
                                            <p>{time}</p>
                                        </ul>
                                    ))
                                }
                            </li>
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
                        times.length !== 0 && date !== ''
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

                    {
                        datesTimes.map((dateTime, index) => {
                            let timeId = '';
                            if (dateTime.times === 'All-Day') {
                                timeId = 'All-Day';
                            } else {
                                timeId = times.join('');
                            } 

                            return (
                                <div className="result">
                                    <div>
                                        <button type="button" onClick={removeDateTime}>×</button>
                                        <h4>{dateTime.date}</h4>
                                    </div>

                                    <li>
                                        {
                                            dateTime.times === 'All-Day'
                                            ?
                                            <ul className="list-item" key={date + timeId + index} id={date + timeId + index}>
                                                <button type="button" onClick={removeDateTime}>×</button>
                                                <p>{dateTime.times}</p>
                                            </ul>
                                            :
                                            dateTime.times?.map((time, timeIndex) => {
                                                return (
                                                    <ul className="list-item" key={date + timeId + timeIndex} id={date + timeId + timeIndex}>
                                                        <button type="button" onClick={removeDateTime}>×</button>
                                                        <p>{time}</p>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </li>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </section>
    )
}