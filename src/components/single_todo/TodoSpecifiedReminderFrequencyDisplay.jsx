export default function TodoSpecifiedReminderFrequencyDisplay({convertNumSuffix, reminderFrequency}) {
    return (
        <section className="subsection search-todos-results-todo-reminder-frequency-section">
            <h4 className="todo-header">Date and Time:</h4>

            <section className="search-todos-results-date-time-container">
                {
                    reminderFrequency.map((dateTime, dateIndex) => {
                        let dateString = String(new Date(dateTime.date).toUTCString()).replace(',', '').split(' ')
                        let dayWord = dateString[0];
                        let dayNum = dateString[1];
                        let month = dateString[2];
                        let year = dateString[3];

                        let displayedDate = dayWord + ', ' + month + ' ' + dayNum + ', ' + year;
                        return (
                            <section className="subsection" key={dateTime + dateIndex}>
                                <p>Date: {displayedDate}</p>
                                {
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
                                        return <p key={time + timeIndex}>Time: {displayedTime}</p>
                                    })
                                }
                            </section>
                        )
                    })
                }
            </section>
        </section>
    )
}