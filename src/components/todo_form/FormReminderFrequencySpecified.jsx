import { useEffect, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import FormReminderFrequencySpecifiedCurrentDateTimesDisplayed from "./form_reminder_frequency_specified/FormReminderFrequencySpecifiedCurrentDateTimesDisplayed";
import FormReminderFrequencySpecifiedAllDateTimesDisplayed from "./form_reminder_frequency_specified/FormReminderFrequencySpecifiedAllDateTimesDisplayed";

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

    return (
        <section aria-label="Inside are the Edit Reminder Frequency Specified Settings. You can add specific dates for your notification, and under those dates add multiple specific times or set the time to All-Day.">
            <h3 aria-hidden="true">Date And Time</h3>

            <section className="subsection">
                <div id="specific-date-time-container">
                    <input aria-label={datesTimes?.some(dateTime => dateTime.date === date) ? 'Please choose another date, ' + date + ' has already been added' : date ==='' ? 'Date is empty, please enter date to add times.' : date + ' available for use'} type='date' id="specified-date-input" onChange={handleChange} value={date} />
                    <label aria-hidden="true" htmlFor="specified-date-input">Choose Specific Date</label>
                </div>
            </section>

            {
                date !== '' && (datesTimes?.length === 0 || !datesTimes?.some(dateTime => dateTime.date === date))
                &&
                <>
                    <section className="subsection">
                        <div>
                            <input aria-label={'Add specific times for ' + date} type="time" id="specified-time-input" onChange={handleChange} value={time} />
                            <label aria-hidden="true" htmlFor="specified-time-input">Choose Specific Time</label>
                        </div>

                        <button 
                            aria-disabled={time === '' || (times.length !== 0 && times?.some(oneTime => oneTime === time))}
                            disabled={time === '' || (times.length !== 0 && times?.some(oneTime => oneTime === time))}
                            aria-label={
                                (time !== '' && (times.length !== 0 && !times?.some(oneTime => oneTime === time))) ? 'Add Time' : time === '' ? 'Time Empty' : time + ' has already been added'
                            }
                            type="button" 
                            onClick={handleAddTime}
                        >
                            Add Time
                        </button>
                    </section>
                    
                    <section className="subsection">
                        <div>
                            <input aria-label={'Set time for ' + date + ' to All-Day'} type="checkbox" id="specified-all-day-checked" onChange={handleChange} checked={allDay} />
                            <label aria-hidden="true" htmlFor="specified-all-day-checked">All-Day</label>
                        </div>
                    </section>

                    <FormReminderFrequencySpecifiedCurrentDateTimesDisplayed
                        date={date}
                        times={times}
                        removeTime={removeTime}
                    />

                    {
                        allDay === true
                        &&
                        <div className="result current-datetime">
                            <hr aria-hidden="true" />
                            <h3 aria-label={date + ' All-Day'}>{date} - (All-Day)</h3>
                        </div>
                    }

                    <button 
                        aria-disabled={!((times.length > 0 && date !== '') || (date !== '' && allDay === true))}
                        disabled={!((times.length > 0 && date !== '') || (date !== '' && allDay === true))}
                        aria-label={
                            (
                                ((times.length > 0 && date !== '') || (date !== '' && allDay === true)) 
                                ? 'Add Date and Time' 
                                : ((times.length === 0 || allDay === false) ? 'Time for ' + date + ' incomplete' : '')
                            )
                        }
                        type="button" 
                        onClick={handleAddDateTimes}
                    >
                        Add Date and Times
                    </button>
                    
                </>
            }

            <FormReminderFrequencySpecifiedAllDateTimesDisplayed 
                datesTimes={datesTimes}
                removeDateTime={removeDateTime}
                handleEditDateTime={handleEditDateTime}
            />
        </section>
    )
}