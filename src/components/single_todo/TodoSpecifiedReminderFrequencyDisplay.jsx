export default function TodoSpecifiedReminderFrequencyDisplay({convertNumSuffix, reminderFrequency}) {
    return (
        <section className="subsection search-todos-results-todo-reminder-frequency-section">
            <h4 className="todo-header" aria-label="Today's To-Do Reminder Frequency: Specified">Date and Time:</h4>

            {
                reminderFrequency.map((dateTime, dateIndex) => {
                    let dateString = String(new Date(dateTime.date).toUTCString()).replace(',', '').split(' ')
                    let dayWord = dateString[0];
                    let dayNum = dateString[1];
                    let month = dateString[2];
                    let year = dateString[3];

                    let displayedDate = dayWord + ', ' + month + ' ' + dayNum + ', ' + year;

                    let timesDisplay = [];

                    if (dateTime.times !== 'All-Day') {
                        dateTime.times.map((time, timeIndex) => {
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
                            timesDisplay.push(displayedTime)
                        })
                    }

                    return (
                        <section className="search-todos-results-date-time-container" key={dateTime + dateIndex}>
                            <p aria-hidden="true">Date: {displayedDate}</p>
                            {
                                dateTime.times !== 'All-Day'
                                ?
                                <ul aria-label={'Times set for ' + displayedDate + ': '}>
                                    <p aria-hidden="true">Times: </p>
                                    {
                                        timesDisplay.map(time => {
                                            return <li aria-label={time}>{time}</li>
                                        })
                                    }
                                </ul>
                                :
                                <p aria-label={'Times set for ' + displayedDate + ': ' + dateTime.times}>Time: {dateTime.times}</p>
                            }
                        </section>
                    )
                })
            }
        </section>
    )
}